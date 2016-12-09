'use strict';
import React, { PropTypes as T } from 'react';
import mapboxgl from 'mapbox-gl';
import GLDraw from 'mapbox-gl-draw';

import { mbStyles } from '../utils/mapbox-styles';

const EditMap = React.createClass({
  displayName: 'DisplayMap',

  propTypes: {
    mapId: T.string
  },

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
      this.map.on('click', () => this.handleClick());

      this.addTrashIconListener();
    });
  },

  addDraw: function () {
    this.draw = new GLDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      styles: mbStyles
    });
    this.map.addControl(this.draw);
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
    this.draw.changeMode('draw_polygon');
    let drawIcon = document.querySelector('.mapbox-gl-draw_polygon');
    drawIcon.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon active';
  },

  limitDrawing: function (id) {
    this.draw.changeMode('direct_select', {featureId: id});
  },

  disableDrawIcon: function () {
    let drawIcon = document.querySelector('.mapbox-gl-draw_polygon');
    drawIcon.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon disabled';
  },

  addTrashIconListener: function () {
    let trashIcon = document.querySelector('.mapbox-gl-draw_trash');
    let drawIcon = document.querySelector('.mapbox-gl-draw_polygon');
    trashIcon.addEventListener('mouseup', () => {
      drawIcon.className = 'mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon active';
    });
  },

  handleClick: function () {
    const edits = this.draw.getAll();

    if (edits.features.length === 0) {
      this.startDrawing();
    } else if (edits.features.length === 1) {
      this.disableDrawIcon();
    } else if (edits.features.length > 1) {
      this.limitDrawing(edits.features[0].id);
    }
  },

  render: function () {
    return <div className='map-container bleed-full' id={this.props.mapId}></div>;
  }
});

module.exports = EditMap;
