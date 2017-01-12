'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router';
import MapboxglCompare from 'mapbox-gl-compare';

import { resetSearchMap, setSearchMapBaseLayer } from '../actions';
import mapLayers from '../utils/map-layers';
import { Dropdown } from 'oam-design-system';

var ImagerySearch = React.createClass({
  displayName: 'ImagerySearch',

  propTypes: {
    _resetSearchMap: T.func,
    _setSearchMapBaseLayer: T.func,

    mapData: T.object
  },

  maps: {},

  getInitialState: function () {
    return {
      before: mapLayers[0],
      after: mapLayers[1]
    };
  },

  componentDidMount: function () {
    this.maps.before = new mapboxgl.Map({
      container: this.refs.map1,
      style: {
        'version': 8,
        sources: {
          'source-base': {
            'type': 'raster',
            'tiles': [this.state.before.url],
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

    this.maps.after = new mapboxgl.Map({
      container: this.refs.map2,
      style: {
        'version': 8,
        sources: {
          'source-base': {
            'type': 'raster',
            'tiles': [this.state.after.url],
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

    new MapboxglCompare(this.maps.before, this.maps.after, {
      // mousemove: true // Optional. Set to true to enable swiping during cursor movement.
    });
  },

  componentWillUnmount: function () {
    // this.map.remove();
  },

  changeBaseLayer: function (mapName, layer, e) {
    e.preventDefault();

    this.maps[mapName]
      .removeSource('source-base')
      .addSource('source-base', {
        'type': 'raster',
        'tiles': [layer.url],
        'tileSize': 256
      });

    this.setState({[mapName]: layer});
  },

  renderCompare: function () {
    return (
      <div>
        <Dropdown
          triggerElement='a'
          triggerClassName='button button--achromic drop__toggle--caret'
          triggerActiveClassName='button--active'
          triggerTitle={this.state.before.name}
          triggerText={this.state.before.name}
          direction='down'
          className='drop__content--maplayers'
          alignment='center'>

            <ul className='drop__menu drop__menu--select'>
              {mapLayers.map(o => {
                let c = 'drop__menu-item';
                c += this.state.before.id === o.id ? ' drop__menu-item--active' : '';
                return (
                  <li key={o.id}>
                    <a href='#' className={c} onClick={this.changeBaseLayer.bind(null, 'before', o)} data-hook='dropdown:close'>{o.name}</a>
                  </li>
                );
              })}
            </ul>

        </Dropdown>
        with
        <Dropdown
          triggerElement='a'
          triggerClassName='button button--achromic drop__toggle--caret'
          triggerActiveClassName='button--active'
          triggerTitle={this.state.after.name}
          triggerText={this.state.after.name}
          direction='down'
          className='drop__content--maplayers'
          alignment='center'>

            <ul className='drop__menu drop__menu--select'>
              {mapLayers.map(o => {
                let c = 'drop__menu-item';
                c += this.state.after.id === o.id ? ' drop__menu-item--active' : '';
                return (
                  <li key={o.id}>
                    <a href='#' className={c} onClick={this.changeBaseLayer.bind(null, 'after', o)} data-hook='dropdown:close'>{o.name}</a>
                  </li>
                );
              })}
            </ul>

        </Dropdown>
      </div>
    );
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

            {this.renderCompare()}

            <div className='maps-swipe'>
              <div className='maps-swipe__container' ref='map1'></div>
              <div className='maps-swipe__container' ref='map2'></div>
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
