'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router';
import syncMaps from '../utils/sync-maps';

import { resetSearchMap, setSearchMapBaseLayer } from '../actions';
import mapLayers from '../utils/map-layers';

var ImagerySearch = React.createClass({
  displayName: 'ImagerySearch',

  propTypes: {
    _resetSearchMap: T.func,
    _setSearchMapBaseLayer: T.func,

    mapData: T.object
  },

  maps: [],

  componentDidMount: function () {
    mapLayers.forEach((layer, index) => {
      let map = new mapboxgl.Map({
        container: this.refs[`map${index}`],
        style: {
          'version': 8,
          sources: {
            'source-base': {
              'type': 'raster',
              'tiles': [layer.url],
              'tileSize': 256
            }
          },
          layers: [{
            'id': 'layer-base',
            'type': 'raster',
            'source': 'source-base',
            'minzoom': 0,
            'maxzoom': 22
          }]
        },
        center: this.props.mapData.center,
        zoom: this.props.mapData.zoom
      });
      this.maps[index] = map;
    });

    syncMaps(this.maps);
  },

  componentWillUnmount: function () {
    this.map.remove();
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

            <div className='maps'>
              <div className='map-wrapper'>
                <h2>Map name</h2>
                <div className='map-container' ref='map0'></div>
              </div>
              <div className='map-wrapper'>
                <h2>Map name</h2>
                <div className='map-container' ref='map1'></div>
              </div>
              <div className='map-wrapper'>
                <h2>Map name</h2>
                <div className='map-container' ref='map2'></div>
              </div>
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
    _setSearchMapBaseLayer: (...args) => dispatch(setSearchMapBaseLayer(...args))
  };
}

module.exports = connect(selector, dispatcher)(ImagerySearch);
