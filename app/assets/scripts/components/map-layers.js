'use strict';
import React, { PropTypes as T } from 'react';
import { Dropdown } from 'oam-design-system';
import mapboxgl from 'mapbox-gl';

import baseLayers from '../utils/map-layers';

var MapLayers = React.createClass({
  displayName: 'MapLayers',

  propTypes: {
    setBaseLayer: T.func,
    selectedLayer: T.object
  },

  onLayerSelect: function (layer, e) {
    e.preventDefault();
    this.props.setBaseLayer(layer);
  },

  render: function () {
    return (
      <Dropdown
        triggerElement='a'
        triggerClassName='button-layers'
        triggerActiveClassName='button--active'
        triggerTitle='Choose map layer'
        triggerText='Choose map layer'
        direction='left'
        className='drop__content--maplayers'
        alignment='middle'>

          <ul className='drop__menu drop__menu--select map-layers-list'>
            {baseLayers.map(o => <li key={o.id}>
              <MapLayerItem
                selectedLayer={this.props.selectedLayer}
                layer={o}
                onLayerSelect={this.onLayerSelect}
              />
            </li>)}
          </ul>

      </Dropdown>
    );
  }
});

module.exports = MapLayers;

// Each Map layer it's its own component because we need to be able to add the
// actual map on component mount.
var MapLayerItem = React.createClass({
  displayName: 'MapLayerItem',

  propTypes: {
    selectedLayer: T.object,
    layer: T.object,
    onLayerSelect: T.func
  },

  map: null,

  componentDidMount: function () {
    this.map = new mapboxgl.Map({
      container: this.refs.map,
      style: {
        'version': 8,
        'sources': {
          'raster-tiles': {
            'type': 'raster',
            'tiles': [this.props.layer.url],
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
      center: [9, 0],
      zoom: 0
    });

    this.map.scrollZoom.disable();
    this.map.boxZoom.disable();
    this.map.dragRotate.disable();
    this.map.dragPan.disable();
    this.map.keyboard.disable();
    this.map.doubleClickZoom.disable();
    this.map.touchZoomRotate.disable();

    // disable map rotation using touch rotation gesture
    this.map.touchZoomRotate.disableRotation();
  },

  componentWillUnmount: function () {
    // this.map.remove();
  },

  render: function () {
    let c = 'drop__menu-item';
    c += this.props.selectedLayer.id === this.props.layer.id ? ' drop__menu-item--active' : '';
    return (
      <a href='#' className={c} onClick={this.props.onLayerSelect.bind(null, this.props.layer)} data-hook='dropdown:close'>
        <div className='map-layers-list__map' ref='map'></div>
        <span className='map-layers-list__text'>{this.props.layer.name}</span>
      </a>
    );
  }
});
