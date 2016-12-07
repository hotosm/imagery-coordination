'use strict';
import React from 'react';
import mapboxgl from 'mapbox-gl';

const Map = React.createClass({
  propTypes: {

  },
  componentDidMount: function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';
    const map = this._map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [0, 20],
      zoom: 2
    });

    map.on('load', () => {

    });
  },
  render: function () {
    return <div className='map-container bleed-full' id='map'></div>;
  }
});

module.exports = Map;
