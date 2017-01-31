'use strict';
import React, { PropTypes as T } from 'react';
import GLDraw from 'mapbox-gl-draw';
import extent from '@turf/bbox';
import _ from 'lodash';

import MapLayers from './map-layers';
import { mbStyles } from '../utils/mapbox-styles';
import * as mapUtils from '../utils/map';

const EditMap = React.createClass({
  displayName: 'EditMap',

  propTypes: {
    selectedLayer: T.object,
    mapId: T.string,
    className: T.string,
    onFeatureDraw: T.func,
    onFeatureRemove: T.func,
    onBaseLayerSelect: T.func,
    geometry: T.object,
    otherTasks: T.object
  },

  map: null,
  drawPlugin: null,
  // Flag to control when an interaction is the result of drawing.
  wasDraw: null,

  componentDidMount: function () {
    this.map = mapUtils.setupMap(this.refs.map, this.props.selectedLayer.url);
    this.addDraw();

    this.map.on('load', this.onMapLoaded);
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  componentWillReceiveProps: function (nextProps) {
    const lastAOI = this.props.geometry;
    const nextAOI = nextProps.geometry;

    if (!nextAOI) {
      this.drawPlugin.deleteAll();
      this.startDrawing();
    }

    if ((lastAOI && nextAOI && nextAOI.geometry.coordinates[0] && !_.isEqual(lastAOI, nextAOI)) ||
     (!lastAOI && nextAOI && nextAOI.geometry.coordinates)) {
      this.loadExistingSource(nextAOI);
    }

    if (this.map._loaded && !_.isEqual(this.props.otherTasks, nextProps.otherTasks)) {
      this.addShadowFeatures(nextProps.otherTasks);
    }

    if (nextProps.selectedLayer.id !== this.props.selectedLayer.id) {
      this.map
        .removeSource('raster-tiles')
        .addSource('raster-tiles', {
          'type': 'raster',
          'tiles': [nextProps.selectedLayer.url],
          'tileSize': 256
        });
    }
  },

  onMapLoaded: function () {
    const trashIcon = document.querySelector('.mapbox-gl-draw_trash');
    let trashIconClasses = trashIcon.classList;
    trashIconClasses.add('disabled');
    trashIconClasses.remove('active');

    trashIcon.addEventListener('click', () => {
      if (this.drawPlugin.getMode() === 'direct_select') {
        this.drawPlugin.deleteAll();
        this.startDrawing();
        trashIconClasses.add('disabled');
        trashIconClasses.remove('active');
      }
    });

    const prevAOI = this.props.geometry;
    prevAOI && prevAOI.geometry.coordinates
      ? this.loadExistingSource(prevAOI)
      : this.addNewSource();

    this.addShadowFeatures(this.props.otherTasks);
  },

  addShadowFeatures: function (otherTasks) {
    if (otherTasks !== null) {
      if (this.map.getSource('shadow-features')) {
        this.map.removeSource('shadow-features');
      }

      this.map.addSource('shadow-features', {
        type: 'geojson',
        data: otherTasks
      });

      if (!this.map.getLayer('shadow-features')) {
        this.map.addLayer({
          'id': 'shadow-features',
          'type': 'fill',
          'source': 'shadow-features',
          'paint': {
            'fill-color': '#000',
            'fill-opacity': 0.16
          }
        });
      }

      // If there's nothing drawn, zoom to the shadow features.
      if (!this.props.geometry) {
        this.map.fitBounds(extent(otherTasks), {
          padding: 30,
          duration: 0
        });
      }
    }
  },

  addDraw: function () {
    this.drawPlugin = new GLDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      styles: mbStyles
    });
    this.map.addControl(this.drawPlugin);
    this.map.on('draw.create', () => this.handleDraw());
    this.map.on('draw.delete', () => this.handleDraw());
    this.map.on('draw.update', () => this.handleDraw());
    this.map.on('draw.selectionchange', () => {
      const selected = this.drawPlugin.getSelectedIds();
      let trashIconClasses = document.querySelector('.mapbox-gl-draw_trash').classList;
      if (selected.length) {
        this.drawPlugin.changeMode('direct_select', {featureId: selected[0]});
        trashIconClasses.add('active');
        trashIconClasses.remove('disabled');
      } else {
        trashIconClasses.add('disabled');
        trashIconClasses.remove('active');
      }
    });
    this.startDrawing();
  },

  loadExistingSource: function (aoi) {
    aoi = Object.assign({}, aoi);
    aoi.id = 'edit-layer';
    this.limitDrawing();
    !this.wasDraw && this.zoomToFeature(aoi);
    this.wasDraw = false;
    this.drawPlugin.set({
      'type': 'FeatureCollection',
      'features': [aoi]
    });
  },

  addNewSource: function () {
    this.map.addSource('edit-layer', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
    this.addLayer();
  },

  addLayer: function () {
    this.map.addLayer({
      'id': 'edit-layer',
      'type': 'fill',
      'source': 'edit-layer',
      'layout': {},
      'filter': [
        'all',
        ['==', '$type', 'Polygon']
      ]
    });
  },

  zoomToFeature: function (feat) {
    this.map.fitBounds(extent(feat), {
      padding: 15,
      duration: 0
    });
  },

  startDrawing: function () {
    let drawIconClasses = document.querySelector('.mapbox-gl-draw_polygon').classList;
    drawIconClasses.remove('disabled');
    drawIconClasses.add('active');
  },

  limitDrawing: function () {
    let drawIconClasses = document.querySelector('.mapbox-gl-draw_polygon').classList;
    drawIconClasses.remove('active');
    drawIconClasses.add('disabled');
  },

  handleDraw: function () {
    const edits = this.drawPlugin.getAll();
    const editCount = edits.features.length;

    if (editCount === 0) {
      this.startDrawing();
      this.props.onFeatureRemove();
    } else if (editCount === 1) {
      this.limitDrawing();
      // Prevent zoom to feature when is the result of edition.
      this.wasDraw = true;
      this.props.onFeatureDraw(edits);
    }
  },

  render: function () {
    return (
      <div className={this.props.className}>
        <div className='map-layers'>
          <MapLayers selectedLayer={this.props.selectedLayer} onBaseLayerSelect={this.props.onBaseLayerSelect} />
        </div>
        <div id={this.props.mapId} ref='map'></div>
      </div>
    );
  }
});

module.exports = EditMap;
