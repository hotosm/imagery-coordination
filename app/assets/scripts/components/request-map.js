'use strict';
import React, { PropTypes as T } from 'react';
import { render } from 'react-dom';
import mapboxgl from 'mapbox-gl';
import center from '@turf/center';
import extent from '@turf/bbox';
import _ from 'lodash';

import MapLayers from './map-layers';
import MapTaskPopover from './map-task-popover';

import * as mapUtils from '../utils/map';
import { taskStatusStyles } from '../utils/constants';

const RequestMap = React.createClass({
  displayName: 'RequestMap',

  propTypes: {
    onBaseLayerChange: T.func,
    selectedLayer: T.object,
    mapId: T.string,
    results: T.object,
    className: T.string
  },

  componentDidMount: function () {
    this.map = mapUtils.setupMap(this.refs.map, this.props.selectedLayer.url);
    this.map.on('load', this.onMapLoaded);
  },

  onMapLoaded: function () {
    this.setupFeatures(this.props.results);

    this.map.on('mousemove', (e) => {
      if (!this.map.getLayer('task-polygon')) {
        return;
      }

      var features = this.map.queryRenderedFeatures(e.point, { layers: ['task-polygon'] });
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      var f = this.map.queryRenderedFeatures(e.point, { layers: ['task-polygon'] });
      if (f.length) {
        this.map.setFilter('task-highlight', ['==', '_id', f[0].properties._id]);
        let status = _.find(taskStatusStyles, {'name': f[0].properties.status});
        this.map.setPaintProperty('task-highlight', 'fill-color', status.color);
        this.map.setPaintProperty('task-polygon', 'fill-opacity', 0.16);
      } else {
        this.map.setFilter('task-highlight', ['==', '_id', '']);
        this.map.setPaintProperty('task-polygon', 'fill-opacity', 0.64);
      }
    });

    this.map.on('click', (e) => {
      var features = this.map.queryRenderedFeatures(e.point, { layers: ['task-polygon'] });
      if (!features.length) {
        return;
      }

      var feature = features[0];

      // Populate the popup and set its coordinates
      // based on the feature found.
      let popoverContent = document.createElement('div');
      render(<MapTaskPopover data={feature.properties} />, popoverContent);

      new mapboxgl.Popup()
        .setLngLat(center(feature).geometry.coordinates)
        .setDOMContent(popoverContent)
        .addTo(this.map);
    });
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  setupFeatures: function (feat) {
    // need go check private map._loaded variable; loaded function is unreliable
    if (this.map._loaded && feat) {
      if ((feat.features && feat.features.length) || (feat.geometry && feat.geometry.coordinates.length)) {
        this.addFeatures(feat);
        this.zoomToFeatures(feat);
      }
    }
  },

  componentWillReceiveProps: function (nextProps) {
    const currentFeat = this.props.results;
    const nextFeat = nextProps.results;

    if ((currentFeat && currentFeat.features.length) && (!nextFeat || !nextFeat.features.length)) {
      this.refreshMap();
    } else {
      if (nextFeat && !_.isEqual(this.props.results, nextFeat)) {
        this.updateFeatures(nextFeat);
      }
    }

    if ((!currentFeat || !currentFeat.features.length) && (nextFeat && nextFeat.features.length)) {
      this.setupFeatures(nextFeat);
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

  addFeatures: function (feat) {
    this.map.addSource('task', {
      type: 'geojson',
      data: feat
    });

    this.map.addLayer({
      'id': `task-highlight`,
      'type': 'fill',
      'source': 'task',
      'paint': {
        'fill-opacity': 0.64
      },
      filter: ['==', '_id', '']
    });

    this.map.addLayer({
      'id': 'task-polygon',
      'type': 'fill',
      'source': 'task',
      'paint': {
        'fill-color': {
          property: 'status',
          type: 'categorical',
          stops: taskStatusStyles.map(s => [s.name, s.color])
        },
        'fill-opacity': 0.64
      }
    });
  },

  zoomToFeatures: function (feat) {
    this.map.fitBounds(extent(feat), {
      padding: 15,
      duration: 0
    });
  },

  updateFeatures: function (feat) {
    if (this.map.getSource('task')) {
      this.removeFeatures();
      this.addFeatures(feat);
      this.zoomToFeatures(feat);
    }
  },

  removeFeatures: function () {
    this.map.removeLayer('task-highlight');
    this.map.removeLayer('task-polygon');
    this.map.removeSource('task');
  },

  refreshMap: function () {
    this.removeFeatures();
    this.map.flyTo({
      center: [0, 20],
      zoom: 1
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

module.exports = RequestMap;
