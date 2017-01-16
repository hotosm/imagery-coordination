'use strict';
import React, { PropTypes as T } from 'react';
import { render } from 'react-dom';
import mapboxgl from 'mapbox-gl';
import geojsonNormalize from '@mapbox/geojson-normalize';
import center from '@turf/center';
import extent from '@turf/bbox';
import _ from 'lodash';

import * as mapUtils from '../utils/map';

import MapLayers from './map-layers';
import MapRequestPopover from './map-request-popover';
import { requestStatusStyles } from '../utils/constants';

const HomeMap = React.createClass({
  displayName: 'HomeMap',

  propTypes: {
    onBaseLayerChange: T.func,
    selectedLayer: T.object,
    mapId: T.string,
    results: T.object,
    className: T.string,
    selectedId: T.string
  },

  componentDidMount: function () {
    this.map = mapUtils.setupMap(this.refs.map, this.props.selectedLayer.url);
    this.map.on('load', this.onMapLoaded);
  },

  onMapLoaded: function () {
    this.setupFeatures(this.props.results);

    this.map.on('mousemove', (e) => {
      var features = this.map.queryRenderedFeatures(e.point, { layers: ['requests'] });
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });

    this.map.on('click', (e) => {
      var features = this.map.queryRenderedFeatures(e.point, { layers: ['requests'] });
      if (!features.length) {
        return;
      }

      var feature = features[0];
      // Sub objects get stringified. Use the id to search in the actual data.
      var featureData = _.find(this.props.results.features, o => o.properties._id === feature.properties._id);

      // Populate the popup and set its coordinates
      // based on the feature found.
      let popoverContent = document.createElement('div');
      render(<MapRequestPopover data={featureData.properties} />, popoverContent);

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
    let pointFeats = _.cloneDeep(feat);
    pointFeats.features.forEach((feat) => {
      feat.geometry = center(feat).geometry;
    });

    this.map.addSource('requests', {
      type: 'geojson',
      data: pointFeats
    });

    this.map.addLayer({
      'id': `requests`,
      'type': 'circle',
      'source': 'requests',
      'paint': {
        'circle-color': {
          property: 'status',
          type: 'categorical',
          stops: requestStatusStyles.map(s => [s.name, s.color])
        },
        'circle-radius': 10
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
    if (this.map.getSource('requests')) {
      this.removeFeatures();
      this.addFeatures(feat);
      this.zoomToFeatures(feat);
    }
  },

  removeFeatures: function () {
    this.map.removeLayer('requests');
    this.map.removeSource('requests');
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

module.exports = HomeMap;