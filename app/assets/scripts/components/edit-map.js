'use strict';
import React, { PropTypes as T } from 'react';
import mapboxgl from 'mapbox-gl';
import GLDraw from 'mapbox-gl-draw';
import extent from '@turf/bbox';

import { mbStyles } from '../utils/mapbox-styles';

const EditMap = React.createClass({
  displayName: 'DisplayMap',

  propTypes: {
    mapId: T.string,
    results: T.object
  },

  map: null,
  drawPlugin: null,

  componentDidMount: function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';

    this.map = new mapboxgl.Map({
      container: this.props.mapId,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [0, 20],
      zoom: 1
    });

    this.addDraw();

    this.map.on('load', () => {
      const prevAOI = this.props.results;
      prevAOI.geometry.coordinates[0]
        ? this.loadExistingSource(prevAOI)
        : this.addNewSource();
    });
  },

  componentWillReceiveProps: function (nextProps) {
    const nextAOI = nextProps.results;
    if (nextAOI.geometry.coordinates[0]) {
      this.removeSource();
      this.loadExistingSource(nextAOI);
      this.zoomToFeature(nextAOI);
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
    this.startDrawing();
  },

  loadExistingSource: function (prevAOI) {
    this.map.addSource('edit-layer', {
      type: 'geojson',
      data: prevAOI
    });
    this.addLayer();
    this.zoomToFeature(prevAOI);
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

  removeSource: function () {
    this.map.removeSource('edit-layer');
    this.map.removeLayer('edit-layer');
  },

  addLayer: function () {
    this.map.addLayer({
      'id': 'edit-layer',
      'type': 'fill',
      'source': 'edit-layer',
      'layout': {},
      'paint': {
        'fill-color': '#73b6e6',
        'fill-outline-color': '#fff'
      },
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
    let drawIcon = document.querySelector('.mapbox-gl-draw_polygon');
    drawIcon.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon active';
  },

  limitDrawing: function (id) {
    let drawIcon = document.querySelector('.mapbox-gl-draw_polygon');
    drawIcon.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon disabled';
  },

  handleDraw: function () {
    const edits = this.drawPlugin.getAll();
    const editCount = edits.features.length;

    if (editCount === 0) {
      this.startDrawing();
    } else if (editCount === 1) {
      this.limitDrawing(edits.features[0].id);
    }
  },

  render: function () {
    return <div className='map-container bleed-full' id={this.props.mapId}></div>;
  }
});

module.exports = EditMap;
