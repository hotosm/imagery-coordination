'use strict';
import React, { PropTypes as T } from 'react';
import mapboxgl from 'mapbox-gl';
import center from '@turf/center';
import extent from '@turf/bbox';
import _ from 'lodash';

import MapLayers from './map-layers';

const DisplayMap = React.createClass({
  displayName: 'DisplayMap',

  propTypes: {
    onBaseLayerChange: T.func,
    selectedLayer: T.object,
    mapId: T.string,
    results: T.object,
    className: T.string
  },

  componentDidMount: function () {
    this.map = new mapboxgl.Map({
      container: this.refs.map,
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

    this.map.on('load', () => {
      this.setupFeature();
    });
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  setupFeature: function () {
    const feat = this.props.results;
    if (this.map.loaded() && feat) {
      if ((feat.features && feat.features.length) || (feat.geometry && feat.geometry.coordinates.length)) {
        this.addFeature(feat);
        this.addPoints(feat);
        this.zoomToFeature(feat);
      }
    }
  },

  componentWillReceiveProps: function (nextProps) {
    let nextFeat = nextProps.results;
    if (nextFeat && !_.isEqual(this.props.results, nextFeat)) {
      this.setupFeature();
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

  addFeature: function (feat) {
    this.map.addSource('task', {
      type: 'geojson',
      data: feat
    });
    this.map.addLayer({
      'id': 'task',
      'type': 'fill',
      'source': 'task',
      'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.32
      }
    });
  },

  addPoints: function (feat) {
    this.map.addSource('points', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: feat.features.map((f) => center(f))
      }
    });
    this.map.addLayer({
      'id': 'points',
      'type': 'circle',
      'source': 'points',
      'paint': {
        'circle-color': '#088',
        'circle-radius': 8
      }
    });
  },

  zoomToFeature: function (feat) {
    this.map.fitBounds(extent(feat), {
      padding: 15,
      // ease-in-out quint
      easing: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    });
  },

  render: function () {
    return (
      <div className={this.props.className}>
        <div className='map-layers'>
          <MapLayers selectedLayer={this.props.selectedLayer} onBaseLayerSelect={this.props.onBaseLayerChange} />
        </div>
        <div id={this.props.mapId} ref='map'></div>
      </div>
    );
  }
});

module.exports = DisplayMap;
