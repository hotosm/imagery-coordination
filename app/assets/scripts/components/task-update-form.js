'use strict';
import React, { PropTypes as T } from 'react';
import c from 'classnames';

import { isLoggedIn } from '../utils/auth-service';

var TaskUpdateForm = React.createClass({
  displayName: 'TaskUpdateForm',

  propTypes: {
    user: T.object,
    task: T.object,
    statusUpdate: T.object,

    onSubmit: T.func
  },

  getInitialState: function () {
    return {
      statusError: false,
      commentError: false
    };
  },

  checkErrors: function () {
    let control = true;
    let state = {
      statusError: false,
      commentError: false
    };

    if (this.refs.taskUpdateStatus.value === '--') {
      state.statusError = true;
      control = false;
    }

    if (this.refs.taskUpdateComment.value === '') {
      state.commentError = true;
      control = false;
    }

    this.setState(state);
    return control;
  },

  onStatusUpdateSubmit: function (e) {
    e.preventDefault();

    if (this.checkErrors()) {
      this.props.onSubmit(this.refs.taskUpdateStatus.value, this.refs.taskUpdateComment.value);
      this.refs.form.reset();
    }
  },

  render: function () {
    let token = this.props.user.token;
    let roles = this.props.user.profile.roles;

    if (!isLoggedIn(token)) {
      return null;
    }

    // Surveyors can only access the form if they're assigned.
    let isSurveyor = roles.indexOf('surveyor') !== -1 &&
      roles.indexOf('coordinator') === -1;

    let blockAccess = isSurveyor ? this.props.task.data.assigneeId !== this.props.user.profile.user_id : false;
    let submitClass = c('button button--primary', {disabled: this.state.statusError || this.state.commentError});
    return (
      <div className='task-updates-form'>
        {this.props.statusUpdate.processing ? <p>Submitting status update</p> : null}
        {blockAccess ? <p>Suveyors can only add updates when assigned</p> : null}
        <form className={c('form', {'disabled': blockAccess})} ref='form'>
          <div className='form__group'>
            <label className='form__label' htmlFor='task-update-status'>Status</label>
            <select ref='taskUpdateStatus' className='form__control form__control--medium' id='task-update-status' onChange={this.checkErrors}>
              <option value='--'>Choose a status</option>
              <option value='open'>Open</option>
              <option value='inprogress'>In Progress</option>
              <option value='completed'>Completed</option>
              <option value='unchanged'>Unchanged</option>
            </select>
            {this.state.statusError
              ? <p className='message message--alert'>State needs to be selected</p>
              : null
            }
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='task-update-comment'>Comment</label>
            <textarea ref='taskUpdateComment' className='form__control' id='task-update-comment' rows='4' placeholder="What's the reason for the status change?" onBlur={this.checkErrors} onChange={this.checkErrors}></textarea>
            {this.state.commentError
              ? <p className='message message--alert'>Comment can't be empty</p>
              : null
            }
          </div>
          <div className='form__actions'>
            <button type='submit' className={submitClass} onClick={this.onStatusUpdateSubmit}><span>Add update</span></button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = TaskUpdateForm;
