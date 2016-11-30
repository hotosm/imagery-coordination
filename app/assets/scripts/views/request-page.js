'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import c from 'classnames';
import numeral from 'numeral';

import { fetchRequest } from '../actions';
import * as userUtils from '../utils/users';

var RequestPage = React.createClass({
  displayName: 'RequestPage',

  propTypes: {
    _fetchRequest: T.func,

    params: T.object,
    request: T.object
  },

  componentDidMount: function () {
    this.props._fetchRequest(this.props.params.reqid);
  },

  render: function () {
    let { fetched, fetching, error, data } = this.props.request;

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

    let completedTasks = _.get(data.tasksInfo.status, 'completed', 0);
    let progress = data.tasksInfo.total > 0 ? completedTasks / data.tasksInfo.total * 100 : 0;
    let progressClass = c('progress-bar', {
      'progress-bar--disabled': data.status === 'canceled'
    });

    return (
      <section className='section section--hub'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>{data.name}</h1>
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
            <div className='map-container bleed-full'>Map goes here</div>
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
    request: state.request
  };
}

function dispatcher (dispatch) {
  return {
    _fetchRequest: (...args) => dispatch(fetchRequest(...args))
  };
}

module.exports = connect(selector, dispatcher)(RequestPage);
