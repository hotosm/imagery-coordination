'use strict';
import React from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router';
import syncMaps from 'mapbox-gl-sync-move';

import mapLayers from '../utils/map-layers';
import * as mapUtils from '../utils/map';

var ImagerySearch = React.createClass({
  displayName: 'ImagerySearch',

  propTypes: {
  },

  mainMap: null,
  maps: [],

  setupMap: function (container, layer) {
    let map = new mapboxgl.Map({
      container: container,
      style: {
        'version': 8,
        'sources': {
          'thumb-map': {
            'type': 'raster',
            'tiles': [layer.url],
            'tileSize': 256
          }
        },
        'layers': [{
          'id': 'tiles',
          'type': 'raster',
          'source': 'thumb-map',
          'minzoom': 0,
          'maxzoom': 22
        }]
      },
      center: [0, 0],
      zoom: 1
    });

    map.on('click', e => {
      this.selectLayer(layer);
    });

    return map;
  },

  componentDidMount: function () {
    this.mainMap = new mapboxgl.Map({
      container: this.refs.mapMaster,
      style: {
        'version': 8,
        'sources': {
          'raster-tiles': {
            'type': 'raster',
            'tiles': [mapLayers[0].url],
            'tileSize': 256
          }
        },
        'layers': [{
          'id': 'tiles',
          'type': 'raster',
          'source': 'raster-tiles',
          'minzoom': 0,
          'maxzoom': 22
        }]
      },
      center: [0, 20],
      zoom: 1
    });

    this.mainMap.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // disable map rotation using right click + drag
    this.mainMap.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    this.mainMap.touchZoomRotate.disableRotation();

    // Hack the controls to match the style.
    let controls = document.querySelector('.mapboxgl-ctrl-top-left .mapboxgl-ctrl-group');
    controls.classList.add('button-group', 'button-group--vertical');
    controls.querySelector('.mapboxgl-ctrl-zoom-in').classList.add('button');
    controls.querySelector('.mapboxgl-ctrl-zoom-out').classList.add('button');
    controls.querySelector('.mapboxgl-ctrl-compass').remove();

    this.maps = [
      this.mainMap,
      ...mapLayers.map((o, i) => this.setupMap(this.refs[`mapThumb${i}`], o))
    ];

    syncMaps(this.maps);
  },

  componentWillUnmount: function () {
    this.maps.forEach(m => { m.remove(); });
  },

  selectLayer: function (mapLayer) {
    this.mainMap
      .removeSource('raster-tiles')
      .addSource('raster-tiles', {
        'type': 'raster',
        'tiles': [mapLayer.url],
        'tileSize': 256
      });
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

            <div className='map-container map-container--search-large' ref='mapMaster'></div>
            <ul className='map-thumbs'>
              {mapLayers.map((o, i) => <li key={o.id} ref={`mapThumb${i}`} className='map-thumbs__item'></li>)}
            </ul>

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

  };
}

function dispatcher (dispatch) {
  return {

  };
}

module.exports = connect(selector, dispatcher)(ImagerySearch);
