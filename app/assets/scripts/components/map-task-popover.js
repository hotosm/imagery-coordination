'use strict';
import React, { PropTypes as T } from 'react';
import moment from 'moment';

import * as userUtils from '../utils/users';
import { taskStatusMatrix } from '../utils/constants';

export default React.createClass({
  displayName: 'MapTaskPopover',

  propTypes: {
    data: T.object
  },

  render: function () {
    let data = this.props.data;
    return (
      <article className='popover'>
        <header className='popover__header'>
          <h1 className='popover__title'>
            <a href={`#/requests/${data.requestId}/tasks/${data._id}`}>{data.name}</a>
          </h1>
        </header>
        <div className='popover__body'>
          <p className={`status-indicator status-indicator--${data.status}`}>{taskStatusMatrix[data.status]}</p>

          <p className='task-author'>Created by: <strong>{userUtils.getNameFromId(data.authorId)}</strong></p>

          {data.assigneeId
            ? <p className='task-assignee'>Assigned to: <strong>{userUtils.getNameFromId(data.assigneeId)}</strong></p>
            : <p className='task-assignee'>Assigned to: <strong>Not assigned</strong></p>}

          <p className='meta-info'>Updated on {moment(data.updated).format('YYYY/MM/DD')} by {userUtils.getNameFromId(data.authorId)}</p>
        </div>
      </article>
    );
  }
});
