'use strict';
import React, { PropTypes as T } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import mapboxgl from 'mapbox-gl';
import geojsonNormalize from '@mapbox/geojson-normalize';
import center from '@turf/center';
import extent from '@turf/bbox';
import _ from 'lodash';

import MapLayers from './map-layers';
import * as userUtils from '../utils/users';
import { taskStatusMatrix } from '../utils/constants';

const taskStatusStyles = [
  {name: 'open', color: '#00F'},
  {name: 'completed', color: '#0F0'},
  {name: 'closed', color: '#F00'}
];

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
      this.setupFeatures(this.props.results);
    });

    this.map.on('zoom', () => {
      if (this.map.getSource('task') && this.map.getSource('points')) {
        if (this.map.getZoom() < 8) {
          this.showPoints();
        } else {
          this.hidePoints();
        }
      }
    });

    this.map.on('mousemove', (e) => {
      var features = this.map.queryRenderedFeatures(e.point, { layers: this.getActiveLayers() });
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if (this.map.getZoom() >= 8) {
        var f = this.map.queryRenderedFeatures(e.point, { layers: this.getActiveLayers() });
        if (f.length) {
          this.map.setFilter('task-highlight', ['==', '_id', f[0].properties._id]);
          let status = _.find(taskStatusStyles, {'name': f[0].properties.status});
          this.map.setPaintProperty('task-highlight', 'fill-color', status.color);
          taskStatusStyles.forEach(s => {
            this.map.setPaintProperty(`task-${s.name}`, 'fill-opacity', 0.1);
          });
        } else {
          this.map.setFilter('task-highlight', ['==', '_id', '']);
          taskStatusStyles.forEach(s => {
            this.map.setPaintProperty(`task-${s.name}`, 'fill-opacity', 0.32);
          });
        }
      }
    });

    this.map.on('click', (e) => {
      var features = this.map.queryRenderedFeatures(e.point, { layers: this.getActiveLayers() });
      if (!features.length) {
        return;
      }

      var feature = features[0];

      // Populate the popup and set its coordinates
      // based on the feature found.
      let popoverContent = document.createElement('div');
      render(<Popup data={feature.properties} />, popoverContent);

      
      new mapboxgl.Popup()
        .setLngLat(center(feature).geometry.coordinates)
        .setDOMContent(popoverContent)
        .addTo(this.map);
    });
  },

  getActiveLayers: function () {
    if (this.map.getZoom() < 8) {
      return taskStatusStyles.map(status => `points-${status.name}`);
    } else {
      return taskStatusStyles.map(status => `task-${status.name}`);
    }
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  setupFeatures: function (feat) {
    // need go check private map._loaded variable; loaded function is unreliable
    if (this.map._loaded && feat) {
      if ((feat.features && feat.features.length) || (feat.geometry && feat.geometry.coordinates.length)) {
        this.addFeatures(feat);
        this.addPoints(feat);
        this.zoomToFeatures(feat);
      }
    }
  },

  componentWillReceiveProps: function (nextProps) {
    const currentFeat = geojsonNormalize(this.props.results);
    const nextFeat = geojsonNormalize(nextProps.results);

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
        'fill-opacity': 0.32
      },
      filter: ['==', '_id', '']
    });

    taskStatusStyles.forEach(status => {
      this.map.addLayer({
        'id': `task-${status.name}`,
        'type': 'fill',
        'source': 'task',
        'paint': {
          'fill-color': status.color,
          'fill-opacity': 0.32
        },
        filter: ['==', 'status', status.name]
      });
    });
  },

  addPoints: function (fc) {
    fc = _.cloneDeep(fc);
    fc.features.forEach((feat) => {
      feat.geometry = center(feat).geometry;
    });

    if (fc.features) {
      this.map.addSource('points', {
        type: 'geojson',
        data: fc
      });

      taskStatusStyles.forEach(status => {
        this.map.addLayer({
          'id': `points-${status.name}`,
          'type': 'circle',
          'source': 'points',
          'paint': {
            'circle-color': status.color,
            'circle-radius': 10
          },
          'layout': {
            'visibility': 'none'
          },
          filter: ['==', 'status', status.name]
        });
      });
    }
  },

  showPoints: function () {
    this.map.setLayoutProperty('task-highlight', 'visibility', 'none');
    taskStatusStyles.forEach(status => {
      this.map.setLayoutProperty(`points-${status.name}`, 'visibility', 'visible');
      this.map.setLayoutProperty(`task-${status.name}`, 'visibility', 'none');
    });
  },

  hidePoints: function () {
    this.map.setLayoutProperty('task-highlight', 'visibility', 'visible');
    taskStatusStyles.forEach(status => {
      this.map.setLayoutProperty(`points-${status.name}`, 'visibility', 'none');
      this.map.setLayoutProperty(`task-${status.name}`, 'visibility', 'visible');
    });
  },

  zoomToFeatures: function (feat) {
    this.map.fitBounds(extent(feat), {
      padding: 15,
      duration: 0
    });
  },

  updateFeatures: function (feat) {
    if (this.map.getSource('task-open') && this.map.getSource('points-open')) {
      this.removeFeatures();
      this.addFeatures(feat);
      this.addPoints(feat);
      this.zoomToFeatures(feat);
    }
  },

  removeFeatures: function () {
    this.map.removeLayer('task-highlight');
    taskStatusStyles.forEach(status => {
      this.map.removeLayer(`task-${status.name}`);
      this.map.removeLayer(`points-${status.name}`);
    });
    this.map.removeSource('task');
    this.map.removeSource('points');
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

const Popup = React.createClass({
  displayName: 'Popup',

  propTypes: {
    data: T.object
  },

  render: function () {
    let data = this.props.data;
    return (
      <article className='popover'>
        <header className='popover__header'>
          <h1 className='popover__title'>
            <a href={`#/requests/${data.requestId}/tasks/${data._id}`}>{data.name}</a>
          </h1>
        </header>
        <div className='popover__body'>
          <p className={`status-indicator status-indicator--${data.status}`}>{taskStatusMatrix[data.status]}</p>

          <p className='task-author'>Created by: <strong>{userUtils.getNameFromId(data.authorId)}</strong></p>

          {data.assigneeId
            ? <p className='task-assignee'>Assigned to: <strong>{userUtils.getNameFromId(data.assigneeId)}</strong></p>
            : <p className='task-assignee'>Assigned to: <strong>Not assigned</strong></p>}

          <p className='meta-info'>Updated on {moment(data.updated).format('YYYY/MM/DD')} by {userUtils.getNameFromId(data.authorId)}</p>
        </div>
      </article>
    );
  }
});
