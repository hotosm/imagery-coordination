'use strict';
import React, { PropTypes as T } from 'react';
import mapboxgl from 'mapbox-gl';
import GLDraw from 'mapbox-gl-draw';

import { mbStyles } from '../utils/mapbox-styles';

const EditMap = React.createClass({
  displayName: 'DisplayMap',

  propTypes: {
    mapId: T.string,
    mapClass: T.string
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
      this.addEditLayer();
    });
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

  addEditLayer: function () {
    this.map.addSource('edit-layer', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
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
    return <div className={this.props.mapClass} id={this.props.mapId}></div>;
  }
});

module.exports = EditMap;
