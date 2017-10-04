'use strict';
import React, { PropTypes as T } from 'react';
import moment from 'moment';
import _ from 'lodash';

import * as userUtils from '../utils/users';

export default React.createClass({
  displayName: 'MapTaskPopover',

  propTypes: {
    data: T.shape({
      _id: T.string.isRequired,
      tasksInfo: T.object.isRequired,
      name: T.string.isRequired,
      status: T.string.isRequired,
      updated: T.string.isRequired
    })
  },

  renderNextDue: function () {
    let nextDue = this.props.data.tasksInfo.nextDue;
    if (nextDue === null) {
      return null;
    }

    return (
      <p className='meta-info'>Task <a href={`#/requests/${nextDue.requestId}/tasks/${nextDue._id}`}>{nextDue.name}</a> is the next due on {moment(nextDue.deliveryTime).format('YYYY/MM/DD')}</p>
    );
  },

  render: function () {
    const data = this.props.data;
    const completed = _.get(data.tasksInfo.status, 'completed', 0);
    const inprogress = _.get(data.tasksInfo.status, 'inprogress', 0);
    const open = _.get(data.tasksInfo.status, 'open', 0);

    return (
      <article className='popover popover--request'>
        <header className='popover__header'>
          <h1 className='popover__title'>
            <a href={`#/requests/${data._id}`}>{data.name}</a>
          </h1>
        </header>
        <div className='popover__body'>
          <p className={`status-indicator status-indicator--${data.status}`}>{_.capitalize(data.status)}</p>

          <p className='task-author'>Created by: <strong>{userUtils.getNameFromId(data.authorId)}</strong></p>

          <ul className='request-tasks-info'>
            <li><strong>{open}</strong> Open</li>
            <li><strong>{inprogress}</strong> In progress</li>
            <li><strong>{completed}</strong> Completed</li>
          </ul>

          <p className='meta-info'>Updated on {moment(data.updated).format('YYYY/MM/DD')} by {userUtils.getNameFromId(data.authorId)}</p>
          {this.renderNextDue()}
        </div>
      </article>
    );
  }
});
