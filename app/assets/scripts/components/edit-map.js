'use strict';
import React, { PropTypes as T } from 'react';
import mapboxgl from 'mapbox-gl';
import GLDraw from 'mapbox-gl-draw';
import extent from '@turf/bbox';
import _ from 'lodash';

import MapLayers from './map-layers';
import { mbStyles } from '../utils/mapbox-styles';

const EditMap = React.createClass({
  displayName: 'EditMap',

  propTypes: {
    selectedLayer: T.object,
    mapId: T.string,
    className: T.string,
    onFeatureDraw: T.func,
    onFeatureRemove: T.func,
    onBaseLayerSelect: T.func,
    geometry: T.object
  },

  map: null,
  drawPlugin: null,

  componentDidMount: function () {
    this.map = new mapboxgl.Map({
      container: this.props.mapId,
      style: {
        'version': 8,
        'sources': {
          'raster-tiles': {
            'type': 'raster',
            'tiles': [this.props.selectedLayer.url],
            'tileSize': 256
          }
        },
        'layers': [{
          'id': 'simple-tiles',
          'type': 'raster',
          'source': 'raster-tiles',
          'minzoom': 0,
          'maxzoom': 22
        }]
      },
      center: [0, 20],
      zoom: 1
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // disable map rotation using right click + drag
    this.map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    this.map.touchZoomRotate.disableRotation();
    // Disable scroll zoom
    this.map.scrollZoom.disable();

    // Hack the controls to match the style.
    let controls = document.querySelector('.mapboxgl-ctrl-top-left .mapboxgl-ctrl-group');
    controls.classList.add('button-group', 'button-group--vertical');
    controls.querySelector('.mapboxgl-ctrl-zoom-in').classList.add('button');
    controls.querySelector('.mapboxgl-ctrl-zoom-out').classList.add('button');
    controls.querySelector('.mapboxgl-ctrl-compass').remove();

    this.addDraw();

    this.map.on('load', () => {
      const prevAOI = this.props.geometry;
      prevAOI && prevAOI.geometry.coordinates
        ? this.loadExistingSource(prevAOI)
        : this.addNewSource();
    });
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
    this.startDrawing();
  },

  loadExistingSource: function (aoi) {
    aoi = Object.assign({}, aoi);
    aoi.id = 'edit-layer';
    this.limitDrawing();
    this.zoomToFeature(aoi);
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
      // ease-in-out quint
      easing: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    });
  },

  startDrawing: function () {
    const drawIconClasses = document.querySelector('.mapbox-gl-draw_polygon').classList;
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
