'use strict';
import React, { PropTypes as T } from 'react';
import moment from 'moment';
import _ from 'lodash';
import c from 'classnames';
import numeral from 'numeral';

import * as userUtils from '../utils/users';

export default React.createClass({
  displayName: 'MapTaskPopover',

  propTypes: {
    data: T.object
  },

  renderNextDue: function () {
    let nextDue = this.props.data.tasksInfo.nextDue;
    if (nextDue === null) {
      return null;
    }

    return (
      <p className='meta-info'>Task <a href={`#/${nextDue.requestId}/tasks/${nextDue._id}`}>{nextDue.name}</a> is the next due on {moment(nextDue.deliveryTime).format('YYYY/MM/DD')}</p>
    );
  },

  render: function () {
    let data = this.props.data;
    let completedTasks = _.get(data.tasksInfo.status, 'completed', 0);
    let activeTasks = data.tasksInfo.total - completedTasks;
    let progress = data.tasksInfo.total > 0 ? completedTasks / data.tasksInfo.total * 100 : 0;
    let progressClass = c('progress-bar', {
      'progress-bar--disabled': data.status === 'canceled'
    });

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

          <div className='request-progress'>
            <progress value={progress} max='100' className={progressClass} style={{backgroundSize: progress + '%'}} />
            <p className='progress-value'>{numeral(progress).format('0.0')}%</p>
          </div>

          <ul className='request-tasks-info'>
            <li><strong>{activeTasks}</strong> Active</li>
            <li><strong>{completedTasks}</strong> Complete tasks</li>
          </ul>

          <p className='meta-info'>Updated on {moment(data.updated).format('YYYY/MM/DD')} by {userUtils.getNameFromId(data.authorId)}</p>
          {this.renderNextDue()}
        </div>
      </article>
    );
  }
});
