'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router';
import _ from 'lodash';
import c from 'classnames';
import syncMaps from '../utils/sync-maps';

import { resetSearchMap, setSearchMapBaseLayer, setSearchMapBaseCenter, setSearchMapBaseZoom } from '../actions';
import mapLayers from '../utils/map-layers';

var ImagerySearch = React.createClass({
  displayName: 'ImagerySearch',

  propTypes: {
    _resetSearchMap: T.func,
    _setSearchMapBaseLayer: T.func,

    mapData: T.object
  },

  maps: [],

  loadMap: function (container, mapIndex) {
    return (
      new mapboxgl.Map({
        container: this.refs[container],
        style: {
          'version': 8,
          'sources': {
            'raster-tiles': {
              'type': 'raster',
              'tiles': [mapLayers[mapIndex].url],
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
        center: this.props.mapData.center,
        zoom: this.props.mapData.zoom
      })
    );
  },

  componentDidMount: function () {
    this.maps = [
      this.loadMap('map--search-main', 0),
      this.loadMap('map--search-thumb0', 0),
      this.loadMap('map--search-thumb1', 1),
      this.loadMap('map--search-thumb2', 2)
    ];

    syncMaps(this.maps);
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  onBaseLayerSelect: function (index, e) {
    this.props._setSearchMapBaseLayer(mapLayers[index]);
  },

  render: function () {
    return (
      <section className='section section--page'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>Imagery Search</h1>
            </div>
            <div className='section__actions'>
              <Link to='/requests/edit' className='button-skip'>Skip this step</Link>
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            <ul>
              <li>Before adding a request you need, make sure there is no imagery for the area you're looking for</li>
              <li>Use the map to go through the different available imagery sources</li>
            </ul>

            <div className='map-container map-container--search-large' ref='map--search-main'></div>
            <div className='map--search-thumbs'>
              <div className='map--search-thumb' ref='map--search-thumb0'></div>
              <div className='map--search-thumb' ref='map--search-thumb1'></div>
              <div className='map--search-thumb' ref='map--search-thumb2'></div>
            </div>

          </div>
        </div>
      </section>
    );
  }
});

// /////////////////////////////////////////////////////////////////// //
// Connect functions

function selector (state) {
  return {
    mapData: state.imagerySearch
  };
}

function dispatcher (dispatch) {
  return {
    _resetSearchMap: (...args) => dispatch(resetSearchMap(...args)),
    _setSearchMapBaseLayer: (...args) => dispatch(setSearchMapBaseLayer(...args)),
  };
}

module.exports = connect(selector, dispatcher)(ImagerySearch);
