'use strict';
import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import mapboxgl from 'mapbox-gl';
import extent from '@turf/bbox';
import c from 'classnames';

import * as userUtils from '../utils/users';
import mapLayers from '../utils/map-layers';
import { geometryToFeature } from '../utils/features';

import { taskStatusMatrix } from '../utils/constants';

var TaskCard = React.createClass({
  displayName: 'TaskCard',

  propTypes: {
    requestId: T.string,
    requestName: T.string,
    id: T.string,
    name: T.string,
    status: T.string,
    authorId: T.string,
    assigneeId: T.string,
    updated: T.string,
    geometry: T.array,
    editType: T.string // enabled, disabled, none
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
            'tiles': [mapLayers[0].url],
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
      center: [0, 20],
      zoom: 1,
      interactive: false
    });

    this.map.on('load', () => {
      const geometry = geometryToFeature(this.props.geometry);
      this.map.addSource('task', {
        type: 'geojson',
        data: geometry
      });
      this.map.addLayer({
        'id': 'task',
        'type': 'fill',
        'source': 'task',
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.48
        }
      });
      this.map.fitBounds(extent(geometry), {
        padding: 15,
        duration: 0
      });
    });
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  render: function () {
    let editClass = c('button-edit', {'disabled': this.props.editType === 'disabled'});
    return (
      <article className='task'>
        <div className='task__media' ref='map'></div>
        <div className='task__content'>
          <header className='task__header'>
            <p className='task__subtitle'><Link to={`/requests/${this.props.requestId}`}>{this.props.requestName}</Link></p>
            <h1 className='task__title'>
              <Link to={`/requests/${this.props.requestId}/tasks/${this.props.id}`}>{this.props.name}</Link>
            </h1>
          </header>
          <div className='task__body'>
            <p className={`status-indicator status-indicator--${this.props.status}`}>{taskStatusMatrix[this.props.status]}</p>

            <p className='task-author'>Created by: <strong>{userUtils.getNameFromId(this.props.authorId)}</strong></p>

            {this.props.assigneeId
              ? <p className='task-assignee'>Assigned to: <strong>{userUtils.getNameFromId(this.props.assigneeId)}</strong></p>
              : <p className='task-assignee'>Assigned to: <strong>Not assigned</strong></p>}

            <p className='meta-info'>Updated on {moment(this.props.updated).format('YYYY/MM/DD')} by {userUtils.getNameFromId(this.props.authorId)}</p>
          </div>
          {this.props.editType !== 'none' ? (
            <div className='task__actions'>
              <Link to={`/requests/${this.props.requestId}/tasks/${this.props.id}/edit`} className={editClass}>Edit</Link>
            </div>
          ) : null}
        </div>
      </article>
    );
  }
});

module.exports = TaskCard;
