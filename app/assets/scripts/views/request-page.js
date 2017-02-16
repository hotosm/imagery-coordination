'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import c from 'classnames';
import moment from 'moment';
import numeral from 'numeral';
import Linkify from 'react-linkify';

import { fetchRequest, fetchRequestTasks, invalidateRequest, invalidateTasks, setMapBaseLayer } from '../actions';
import * as userUtils from '../utils/users';
import { geometryToFeature } from '../utils/features';
import { isLoggedIn } from '../utils/auth-service';

import TaskCard from '../components/task-card';
import RequestMap from '../components/request-map';

var RequestPage = React.createClass({
  displayName: 'RequestPage',

  propTypes: {
    _fetchRequest: T.func,
    _fetchRequestTasks: T.func,
    _invalidateRequest: T.func,
    _invalidateTasks: T.func,
    _setMapBaseLayer: T.func,

    params: T.object,
    request: T.object,
    tasks: T.object,
    user: T.object,
    mapState: T.object
  },

  componentDidMount: function () {
    const q = {footprint: true};
    this.props._fetchRequest(this.props.params.reqid, q);
    this.props._fetchRequestTasks(this.props.params.reqid);
  },

  componentWillUnmount: function () {
    this.props._invalidateRequest();
    this.props._invalidateTasks();
  },

  renderTaskCard: function (o) {
    // Conditionals for the edit button.
    let editType = 'none';
    let token = _.get(this.props.user, 'token');
    let roles = _.get(this.props.user, 'profile.roles', []);
    if (isLoggedIn(token) && roles.indexOf('coordinator') !== -1) {
      editType = 'enabled';
    } else if (isLoggedIn(token) && roles.indexOf('surveyor') !== -1) {
      // Only assigned.
      let userId = _.get(this.props.user, 'profile.user_id', null);
      editType = o.assigneeId === userId ? 'enabled' : 'disabled';
    }
    return (
      <li className='tasks-list__item' key={o._id}>
        <TaskCard
          requestId={o.requestId}
          requestName={this.props.request.data.name}
          id={o._id}
          name={o.name}
          status={o.status}
          authorId={o.authorId}
          assigneeId={o.assigneeId}
          updated={o.updated}
          geometry={o.geometry}
          editType={editType}
        />
      </li>
    );
  },

  renderTasks: function () {
    let { fetched, fetching, error, data } = this.props.tasks;

    if (!fetched && !fetching) {
      return null;
    }

    if (fetching) {
      return <p className='loading-indicator'>Loading...</p>;
    }

    if (error) {
      return <p>Error</p>;
    }

    let activeTasks = data.results.filter(o => o.status !== 'completed');
    let completedTasks = data.results.filter(o => o.status === 'completed');

    return (
      <div>
        <section className='tasks-list-container'>
          <h2>Active tasks ({activeTasks.length})</h2>
          {activeTasks.length ? (
            <ul className='tasks-list'>
              {activeTasks.map(this.renderTaskCard)}
            </ul>
          ) : (
            <p>This request has no active tasks</p>
          ) }
        </section>
        <section className='tasks-list-container'>
          <h2>Completed tasks ({completedTasks.length})</h2>
          {completedTasks.length ? (
            <ul className='tasks-list'>
              {completedTasks.map(this.renderTaskCard)}
            </ul>
          ) : (
            <p>This request has no completed tasks</p>
          ) }
        </section>
      </div>
    );
  },

  renderRequestMap: function () {
    let { fetched, fetching, error, data } = this.props.tasks;

    if (!fetched && !fetching) {
      return null;
    }

    if (fetching) {
      return <p className='loading-indicator'>Loading...</p>;
    }

    if (error) {
      return <p>Error</p>;
    }

    let feat = geometryToFeature(data.results, result => {
      return _.omit(result, ['geometry', 'updates']);
    });

    return (
      <RequestMap
        mapId='map-request-page'
        className='map-container map-container--display bleed-full'
        results={feat}
        onBaseLayerChange={this.props._setMapBaseLayer}
        selectedLayer={this.props.mapState.baseLayer} />
    );
  },

  render: function () {
    let { fetched, fetching, error, data } = this.props.request;

    if (!fetched && !fetching) {
      return null;
    }

    if (error || fetching) {
      return (
        <section className='section section--page'>
          <header className='section__header'>
            <div className='inner'>
              <div className='section__headline'>
                <h1 className='section__title'>Request</h1>
              </div>
            </div>
          </header>
          <div className='section__body'>
            <div className='inner'>
              {error ? <p>Error: {error}</p> : null}
              {fetching ? <p className='loading-indicator'>Loading...</p> : null}
            </div>
          </div>
        </section>
      );
    }

    let completedTasks = _.get(data.tasksInfo.status, 'completed', 0);
    let progress = data.tasksInfo.total > 0 ? completedTasks / data.tasksInfo.total * 100 : 0;
    let progressClass = c('progress-bar', {
      'progress-bar--disabled': data.status === 'canceled'
    });

    let timePeriodRequested = 'Most recent available';
    if (data.timePeriodRequested.from && data.timePeriodRequested.to) {
      timePeriodRequested = `${moment(data.timePeriodRequested.from).format('YYYY/MM/DD')} - ${moment(data.timePeriodRequested.to).format('YYYY/MM/DD')}`;
    } else if (data.timePeriodRequested.from && !data.timePeriodRequested.to) {
      timePeriodRequested = `Anything from ${moment(data.timePeriodRequested.from).format('YYYY/MM/DD')} onwards`;
    } else if (!data.timePeriodRequested.from && data.timePeriodRequested.to) {
      timePeriodRequested = `Up to ${moment(data.timePeriodRequested.to).format('YYYY/MM/DD')}`;
    }

    let token = this.props.user.token;
    let roles = _.get(this.props.user, 'profile.roles', []);

    let allowedUser = isLoggedIn(token) && roles.indexOf('coordinator') !== -1;

    return (
      <section className='section section--page'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>{data.name}</h1>
            </div>
            {allowedUser ? (
            <div className='section__actions'>
              <Link to={`/requests/${data._id}/edit`} className='button-edit'><span>Edit request</span></Link>
              <Link to={`/requests/${data._id}/tasks/edit`} className='button-add-task'><span>Add task</span></Link>
            </div>
            ) : null}
            <div className='section__stats'>
              <p className={`status-indicator status-indicator--${data.status}`}>{_.capitalize(data.status)}</p>
              <div className='request-progress'>
                <progress value={progress} max='100' className={progressClass} style={{backgroundSize: progress + '%'}} />
                <p className='progress-value'>{numeral(progress).format('0.0')}% complete</p>
              </div>
              <p>Created by: <strong>{userUtils.getNameFromId(data.authorId)}</strong></p>
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>

            {this.renderRequestMap()}

            <div className='details'>
              <div className='details__col--sec'>
                <dl>
                  <dt>Requesting organization</dt>
                  <dd>{data.requestingOrg ? data.requestingOrg : 'n/a'}</dd>
                  <dt>Time period requested</dt>
                  <dd>{timePeriodRequested}</dd>
                  <dt>Desired GSD</dt>
                  <dd>{data.gsd ? `${data.gsd}m` : 'n/a'}</dd>
                  <dt>Product type</dt>
                  <dd>{data.productType ? data.productType : 'n/a'}</dd>
                </dl>
              </div>
              <div className='details__col--main'>
                <dl>
                  <dt>Purpose</dt>
                  <dd><Linkify>{data.purpose ? data.purpose : 'Purpose not provided'}</Linkify></dd>
                  <dt>Use</dt>
                  <dd><Linkify>{data.use ? data.use : 'Use not provided'}</Linkify></dd>
                  <dt>Notes</dt>
                  <dd><Linkify>{data.notes ? data.notes : 'Notes not provided'}</Linkify></dd>
                </dl>
              </div>
            </div>

            <hr/>

            {this.renderTasks()}

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
    request: state.request,
    tasks: state.tasks,
    user: state.user,
    mapState: state.map
  };
}

function dispatcher (dispatch) {
  return {
    _fetchRequest: (...args) => dispatch(fetchRequest(...args)),
    _fetchRequestTasks: (...args) => dispatch(fetchRequestTasks(...args)),
    _invalidateRequest: (...args) => dispatch(invalidateRequest(...args)),
    _invalidateTasks: (...args) => dispatch(invalidateTasks(...args)),
    _setMapBaseLayer: (...args) => dispatch(setMapBaseLayer(...args))
  };
}

module.exports = connect(selector, dispatcher)(RequestPage);
