'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router';
import _ from 'lodash';
import c from 'classnames';

import { resetSearchMap, setSearchMapBaseLayer } from '../actions';
import mapLayers from '../utils/map-layers';

var ImagerySearch = React.createClass({
  displayName: 'ImagerySearch',

  propTypes: {
    _resetSearchMap: T.func,
    _setSearchMapBaseLayer: T.func,

    mapData: T.object
  },

  componentDidMount: function () {
    let layers = [];
    let sources = {};

    mapLayers.forEach((layer, index) => {
      sources[`source-${layer.id}`] = {
        'type': 'raster',
        'tiles': [layer.url],
        'tileSize': 256
      };

      layers.push({
        'id': `layer-${layer.id}`,
        'type': 'raster',
        'source': `source-${layer.id}`,
        'paint': {
          'raster-opacity': index === 0 ? 1 : 0
        },
        'minzoom': 0,
        'maxzoom': 22
      });
    });

    this.map = new mapboxgl.Map({
      container: this.refs.map,
      style: {
        'version': 8,
        sources,
        layers
      },
      center: this.props.mapData.center,
      zoom: this.props.mapData.zoom
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // disable map rotation using right click + drag
    this.map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    this.map.touchZoomRotate.disableRotation();

    // Hack the controls to match the style.
    let controls = document.querySelector('.mapboxgl-ctrl-top-left .mapboxgl-ctrl-group');
    controls.classList.add('button-group', 'button-group--vertical');
    controls.querySelector('.mapboxgl-ctrl-zoom-in').classList.add('button');
    controls.querySelector('.mapboxgl-ctrl-zoom-out').classList.add('button');
    controls.querySelector('.mapboxgl-ctrl-compass').remove();
  },

  componentWillUnmount: function () {
    this.map.remove();
    this.props._resetSearchMap();
  },

  componentWillReceiveProps: function (nextProps) {
    const {baseLayer} = nextProps.mapData;

    if (baseLayer.id !== this.props.mapData.baseLayer.id) {
      mapLayers.forEach(layer => {
        this.map.setPaintProperty(`layer-${layer.id}`, 'raster-opacity', baseLayer.id === layer.id ? 1 : 0);
      });
    }
  },

  onBaseLayerSelect: function (index, e) {
    this.props._setSearchMapBaseLayer(mapLayers[index]);
  },

  renderNavigation: function () {
    const currIndex = _.findIndex(mapLayers, o => o.id === this.props.mapData.baseLayer.id);
    const total = mapLayers.length;

    return (
      <div className='map-prime-nav'>
        <button className={c('button button--primary button-nav', {disabled: currIndex === 0})} onClick={this.onBaseLayerSelect.bind(null, currIndex - 1)}>Previous</button>
        <button className={c('button button--primary button-nav', {disabled: currIndex === total - 1})} onClick={this.onBaseLayerSelect.bind(null, currIndex + 1)}>Next</button>
        <Link className={c('button button--secondary button-add', {disabled: currIndex !== total - 1})} to='/requests/edit'>Add request</Link>
      </div>
    );
  },

  renderMapLayerList: function () {
    return (
      <div className='map-secnav'>
        <ul className='layer-list'>
          {mapLayers.map((o, i) => {
            return (
              <li key={o.id} className='layer-list__item'>
                <button className={c({'active': this.props.mapData.baseLayer.id === o.id})} onClick={this.onBaseLayerSelect.bind(null, i)} title={`Switch to ${o.name}`}><span>{o.name}</span></button>
              </li>
            );
          })}
        </ul>
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

            {this.renderNavigation()}
            <h2 className='map-active-layer'>{this.props.mapData.baseLayer.name}</h2>
            <div className='map-container map-container--search' ref='map'></div>
            {this.renderMapLayerList()}

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
