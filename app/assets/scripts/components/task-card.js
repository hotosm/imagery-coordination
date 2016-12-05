'use strict';
import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

import * as userUtils from '../utils/users';

var TaskCard = React.createClass({
  displayName: 'TaskCard',

  propTypes: {
    requestId: T.string,
    id: T.string,
    name: T.string,
    status: T.string,
    authorId: T.string,
    assigneeId: T.string,
    updated: T.string
  },

  render: function () {
    return (
      <article className='task'>
        <header className='task__header'>
          <h1 className='task__title'>
            <Link to={`/requests/${this.props.requestId}/tasks/${this.props.id}`}>{this.props.name}</Link>
          </h1>
        </header>
        <div className='task__body'>
          <p className={`status-indicator status-indicator--${this.props.status}`}>{_.capitalize(this.props.status)}</p>

          <p className='task-author'>Created by: <strong>{userUtils.getNameFromId(this.props.authorId)}</strong></p>

          {this.props.assigneeId
            ? <p className='task-assignee'>Assigned to: <strong>{userUtils.getNameFromId(this.props.assigneeId)}</strong></p>
            : <p className='task-assignee'>Assigned to: <strong>Not assigned</strong></p>}

          <p className='meta-info'>Updated on {moment(this.props.updated).format('YYYY/MM/DD')} by {userUtils.getNameFromId(this.props.authorId)}</p>
        </div>
      </article>
    );
  }
});

module.exports = TaskCard;
