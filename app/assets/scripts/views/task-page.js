'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

import { invalidateTask, fetchTask, addTaskStatusUpdate } from '../actions';
import * as userUtils from '../utils/users';

import TaskUpdateForm from '../components/task-update-form';
import TaskMap from '../components/task-map';

var TaskPage = React.createClass({
  displayName: 'TaskPage',

  propTypes: {
    _invalidateTask: T.func,
    _fetchTask: T.func,
    _addTaskStatusUpdate: T.func,

    params: T.object,
    task: T.object,
    user: T.object
  },

  componentDidMount: function () {
    this.props._fetchTask(this.props.params.reqid, this.props.params.taskid);
  },

  componentWillUnmount: function () {
    this.props._invalidateTask();
  },

  onTaskUpdateSubmit: function (status, comment) {
    this.props._addTaskStatusUpdate(this.props.params.reqid, this.props.params.taskid, {status, comment});
  },

  renderTaskUpdate: function (o) {
    return (
      <li className='task-updates__item' key={o._id}>
        <small className='update-date'>{moment(o.created).format('YYYY/MM/DD')}</small>
        <p className='update-status'><strong>{_.capitalize(o.status)}</strong></p>
        <p className='update-author'>Updated by {userUtils.getNameFromId(o.authorId)}</p>
        <p className='update-comment'>{o.comment}</p>
      </li>
    );
  },

  renderTaskUpdatesBlock: function () {
    let updates = this.props.task.data.updates;
    return (
      <div>
        <section className='task-updates'>
          <h2>Task Progress</h2>

          <TaskUpdateForm
            statusUpdate={this.props.task.statusUpdate}
            user={this.props.user}
            task={this.props.task.data}
            onSubmit={this.onTaskUpdateSubmit}
          />

          <ul className='task-updates__list'>
            {updates.map(this.renderTaskUpdate)}
          </ul>
        </section>
      </div>
    );
  },

  render: function () {
    let { fetched, fetching, error, data } = this.props.task;

    if (!fetched && !fetching) {
      return null;
    }

    if (fetching) {
      // return <LoadingMessage />;
      return <p>Loading</p>;
    }

    if (error) {
      return <p>Error</p>;
    }

    let timePeriodProvidedFrom = data.timePeriodProvided.from
      ? moment(data.timePeriodProvided.from).format('YYYY/MM/DD')
      : 'n/a';

    let timePeriodProvidedTo = data.timePeriodProvided.to
      ? moment(data.timePeriodProvided.to).format('YYYY/MM/DD')
      : 'n/a';

    return (
      <section className='section section--page'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <p className='section__subtitle'><Link to={`/requests/${data.requestId}`}>{data.requestInfo.name}</Link></p>
              <h1 className='section__title'>{data.name}</h1>
              <p className={`status-indicator status-indicator--${data.status}`}>{_.capitalize(data.status)}</p>
              <p className='meta-info'>Updated on {moment(data.updated).format('YYYY/MM/DD')}</p>
              <p className='task-author'>Created by: <strong>{userUtils.getNameFromId(data.authorId)}</strong></p>
              {data.assigneeId
                ? <p className='task-assignee'>Assigned to: <strong>{userUtils.getNameFromId(data.assigneeId)}</strong></p>
                : <p className='task-assignee'>Assigned to: <strong>Not assigned</strong></p>}
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            <TaskMap mapId='map--task-page' />
            <div className='details'>
              <div className='details__col--medium'>
                <dl>
                  <dt>Deliver by</dt>
                  <dd>{data.deliveryTime ? moment(data.deliveryTime).format('YYYY/MM/DD') : 'n/a'}</dd>
                  <dt>Time period Provided</dt>
                  <dd>{timePeriodProvidedFrom} - {timePeriodProvidedTo}</dd>
                </dl>
              </div>
            </div>

            <hr/>

            {this.renderTaskUpdatesBlock()}

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
    task: state.task,
    user: state.user
  };
}

function dispatcher (dispatch) {
  return {
    _invalidateTask: (...args) => dispatch(invalidateTask(...args)),
    _fetchTask: (...args) => dispatch(fetchTask(...args)),
    _addTaskStatusUpdate: (...args) => dispatch(addTaskStatusUpdate(...args))
  };
}

module.exports = connect(selector, dispatcher)(TaskPage);
