'use strict';
import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import c from 'classnames';

import TaskCardMap from './task-card-map';
import * as userUtils from '../utils/users';

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
    editType: T.string // enabled, disabled, none
  },

  render: function () {
    let editClass = c('button-edit', {'disabled': this.props.editType === 'disabled'});
    return (
      <article className='task'>
        <TaskCardMap taskId={this.props.id} className='task__media' />
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
