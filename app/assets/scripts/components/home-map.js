'use strict';
import React, { PropTypes as T } from 'react';
import { render } from 'react-dom';
import mapboxgl from 'mapbox-gl';
import geojsonNormalize from '@mapbox/geojson-normalize';
import center from '@turf/center';
import extent from '@turf/bbox';
import _ from 'lodash';
import { Dropdown } from 'oam-design-system';

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

  map: null,
  popup: null,

  componentDidMount: function () {
    this.map = mapUtils.setupMap(this.refs.map, this.props.selectedLayer.url);
    this.map.on('load', this.onMapLoaded);
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

  componentWillUnmount: function () {
    this.map.remove();
  },

  onMapLoaded: function () {
    this.setupFeatures(this.props.results);

    this.map.on('mousemove', (e) => {
      if (!this.map.getLayer('requests')) {
        return;
      }
      var features = this.map.queryRenderedFeatures(e.point, { layers: ['requests'] });
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });

    this.map.on('click', (e) => {
      if (!this.map.getLayer('requests')) {
        return;
      }
      var features = this.map.queryRenderedFeatures(e.point, { layers: ['requests'] });
      if (!features.length) {
        return;
      }

      var feature = features[0];
      this.openPopup(feature.properties._id);
    });
  },

  openPopup: function (featId) {
    if (this.popup !== null) {
      this.popup.remove();
    }

    // Sub objects get stringified. Use the id to search in the actual data.
    var featureData = _.find(this.props.results.features, o => o.properties._id === featId);

    // Populate the popup and set its coordinates
    // based on the feature found.
    let popoverContent = document.createElement('div');
    render(<MapRequestPopover data={featureData.properties} />, popoverContent);

    this.popup = new mapboxgl.Popup()
      .setLngLat(center(featureData).geometry.coordinates)
      .setDOMContent(popoverContent)
      .addTo(this.map);
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

    // Open the tolltip for the most recent feature.
    let recentSorted = _.sortBy(this.props.results.features, o => o.properties.created);
    this.openPopup(_.last(recentSorted).properties._id);
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

  onJumpToSelect: function (what, e) {
    e.preventDefault();

    if (!this.props.results.features.length) {
      return;
    }

    var feature;
    switch (what) {
      case 'most-recent':
        let recentSorted = _.sortBy(this.props.results.features, o => o.properties.created);
        feature = _.last(recentSorted);
        break;
      case 'next-due':
        let nextDue = this.props.results.features.filter(f => f.properties.tasksInfo.nextDue !== null);
        if (!nextDue.length) {
          // There aren't any requests with next due information.
          return;
        }
        let nextSorted = _.sortBy(nextDue, o => o.properties.tasksInfo.nextDue.deliveryTime);
        feature = nextSorted[0];
        break;
    }

    this.map.flyTo({
      center: center(feature).geometry.coordinates,
      zoom: 5
    });
    this.openPopup(feature.properties._id);
  },

  render: function () {
    return (
      <div className={this.props.className}>
        <div className='map-layers'>
          <MapLayers selectedLayer={this.props.selectedLayer} onBaseLayerSelect={this.props.onBaseLayerChange} />
        </div>
        <div id={this.props.mapId} ref='map'></div>

        <div className='map-jump'>
          <Dropdown
            triggerElement='a'
            triggerClassName='button button--achromic drop__toggle--caret'
            triggerActiveClassName='button--active'
            triggerTitle='Jump to'
            triggerText='Jump to'
            direction='up'
            className='drop__content'
            alignment='right'>

              <ul className='drop__menu drop__menu--select'>
                <li><a href='#' className='drop__menu-item' onClick={this.onJumpToSelect.bind(null, 'next-due')} data-hook='dropdown:close'>Next due</a></li>
                <li><a href='#' className='drop__menu-item' onClick={this.onJumpToSelect.bind(null, 'most-recent')} data-hook='dropdown:close'>Most recent</a></li>
              </ul>

          </Dropdown>
        </div>
      </div>
    );
  }
});

module.exports = HomeMap;
