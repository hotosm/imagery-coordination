'use strict';
import React, { PropTypes as T } from 'react';
import mapboxgl from 'mapbox-gl';

import { geometryToFeature } from '../utils/features';

const TaskMap = React.createClass({
  propTypes: {
    mapId: T.string,
    results: T.array
  },
  componentDidMount: function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q';
    const map = this._map = new mapboxgl.Map({
      container: this.props.mapId,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [0, 20],
      zoom: 1
    });

    map.on('load', () => {

    });
  },

  componentWillReceiveProps: function (nextProps) {
    const feature = geometryToFeature(nextProps.results);
    console.log(feature);
  },

  render: function () {
    return <div className='map-container bleed-full' id={this.props.mapId}></div>;
  }
});

module.exports = TaskMap;
