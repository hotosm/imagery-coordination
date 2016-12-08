'use strict';
import React, { PropTypes as T } from 'react';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';

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
      this.mapLoaded = true;
    });
  },

  componentWillReceiveProps: function (nextProps) {
    const feat = geometryToFeature(this.props.results);
    const nextFeat = geometryToFeature(nextProps.results);
    if (nextFeat && this.mapLoaded && !_.isEqual(feat, nextFeat)) {
      this._addFeature(nextFeat);
      this._zoomToFeature(nextFeat);
    }
  },

  _addFeature: function (feat) {
    if (this.mapLoaded) {
      this._map.addSource('task', {
        type: 'geojson',
        data: feat
      });
      this._map.addLayer({
        'id': 'task',
        'type': 'fill',
        'source': 'task',
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      });
    }
  },

  _zoomToFeature: function (feat) {
    // Currently problematic
    console.log(JSON.stringify(feat));
    console.log(feat.geometry.coordinates);
    this._map.fitBounds(feat.geometry.coordinates);
  },

  render: function () {
    return <div className='map-container bleed-full' id={this.props.mapId}></div>;
  }
});

module.exports = TaskMap;
