'use strict';
import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import c from 'classnames';

import { fetchRequests, fetchGeneralStats, invalidateRequests } from '../actions';
import * as userUtils from '../utils/users';
import { dateFromRelative } from '../utils/utils';
import { combineFeatureResults } from '../utils/features';

import DisplayMap from '../components/display-map';
import { isLoggedIn } from '../utils/auth-service';

var Home = React.createClass({
  displayName: 'Home',

  propTypes: {
    _fetchRequests: T.func,
    _fetchGeneralStats: T.func,
    _invalidateRequests: T.func,

    requests: T.object,
    generalStats: T.object,
    user: T.object
  },

  componentDidMount: function () {
    this.props._fetchRequests({footprint: true});
    this.props._fetchGeneralStats();
  },

  componentWillUnmount: function () {
    this.props._invalidateRequests();
  },

  getFilters: function () {
    let f = {};
    if (this.refs['filter-author'].value !== '--') {
      f.author = this.refs['filter-author'].value;
    }
    if (this.refs['filter-status'].value !== '--') {
      f.status = this.refs['filter-status'].value;
    }

    let dateFrom = dateFromRelative(this.refs['filter-interval'].value);
    if (dateFrom !== null) {
      f.dateFrom = dateFrom;
    }
    return f;
  },

  handlePageClick: function (d) {
    let f = this.getFilters();
    f.footprint = true;
    f.page = d.selected + 1;
    this.props._fetchRequests(f);
  },

  onFilterChange: function () {
    let f = this.getFilters();
    f.footprint = true;
    this.props._fetchRequests(f);
  },

  renderRequestList: function () {
    const {fetched, fetching, error, data} = this.props.requests;
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

    if (!data.results.length) {
      return <p>No requests found with the selected filters.</p>;
    }

    return (
      <div>
        <ul className='requests__list'>
          {data.results.map(this.renderRequestCard)}
        </ul>

        <div className='pagination-wrapper'>
          <ReactPaginate
            previousLabel={<span>previous</span>}
            nextLabel={<span>next</span>}
            breakLabel={<span className='pages__page'>...</span>}
            pageNum={Math.ceil(data.meta.found / data.meta.limit)}
            forceSelected={data.meta.page - 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            clickCallback={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages'}
            pageClassName={'pages__wrapper'}
            pageLinkClassName={'pages__page'}
            activeClassName={'active'} />
        </div>
      </div>
    );
  },

  renderRequestCard: function (o) {
    let completedTasks = _.get(o.tasksInfo.status, 'completed', 0);
    let progress = o.tasksInfo.total > 0 ? completedTasks / o.tasksInfo.total * 100 : 0;
    let progressClass = c('progress-bar', {
      'progress-bar--disabled': o.status === 'canceled'
    });

    return (
      <li className='requests__item' key={o._id}>
        <article className='request'>
          <header className='request__header'>
            <h1 className='request__title'>
              <Link to={`/requests/${o._id}`}>{o.name}</Link>
            </h1>
          </header>
          <div className='request__body'>
            <p className={`status-indicator status-indicator--${o.status}`}>{_.capitalize(o.status)}</p>

            <div className='request-progress'>
              <progress value={progress} max='100' className={progressClass} style={{backgroundSize: progress + '%'}} />
              <p className='progress-value'>{numeral(progress).format('0.0')}% complete</p>
            </div>

            <ul className='request-tasks-info'>
              <li><strong>{_.get(o.tasksInfo.status, 'open', 0)}</strong> Active</li>
              <li><strong>{completedTasks}</strong> Complete tasks</li>
            </ul>

            <p className='meta-info'>Created on {moment(o.created).format('YYYY/MM/DD')} by {userUtils.getNameFromId(o.authorId)}</p>
          </div>
        </article>
      </li>
    );
  },

  renderStats: function () {
    let {fetched, fetching, data} = this.props.generalStats;

    if (!fetched || fetching) {
      return null;
    }

    return (
      <ul className='general-stats'>
        <li><strong>{data.requests.status.open}</strong> active requests</li>
        <li><strong>{data.requests.status.closed}</strong> closed requests</li>
      </ul>
    );
  },

  render: function () {
    let reqCount = this.props.requests.data.meta.found;
    let token = this.props.user.token;
    let roles = _.get(this.props.user, 'profile.roles', []);

    let allowedUser = isLoggedIn(token) && roles.indexOf('coordinator') !== -1;

    const geometry = combineFeatureResults(this.props.requests.data.results);

    return (
      <section className='section section--home'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>Imagery Coordination App</h1>
              <div className='section__introduction'>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio sit eveniet magnam dignissimos itaque sequi ullam praesentium voluptas esse sunt repudiandae impedit, rerum maxime unde debitis saepe aut molestiae dolorem.</p>
              </div>
            </div>
            {this.renderStats()}
            {allowedUser ? (
            <div className='section__actions'>
              <Link to={`/requests/edit`} className='button button--primary'><span>Add request</span></Link>
            </div>
            ) : null}
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>

            <DisplayMap mapId={'map--home'} mapClass={'map-container bleed-full'} results={geometry} />

            <h2>Requests {reqCount > 0 ? `(${reqCount})` : ''}</h2>

            <div className='list-filters'>
              <form className='form'>
                <div className='form__group'>
                  <label className='form__label' htmlFor='request-author'>Author</label>
                  <select ref='filter-author' className='form__control form__control--medium' id='request-author' onChange={this.onFilterChange}>
                    <option value='--'>All</option>
                    {userUtils.getWithRole('coordinator').map(o => <option value={o.userId} key={o.userId}>{o.name}</option>)}
                  </select>
                </div>
                <div className='form__group'>
                  <label className='form__label' htmlFor='request-status'>Status</label>
                  <select ref='filter-status' className='form__control form__control--medium' id='request-status' onChange={this.onFilterChange}>
                    <option value='--'>All</option>
                    <option value='open'>Open</option>
                    <option value='closed'>Closed</option>
                    <option value='canceled'>Canceled</option>
                  </select>
                </div>
                <div className='form__group'>
                  <label className='form__label' htmlFor='request-interval'>Time interval</label>
                  <select ref='filter-interval' className='form__control form__control--medium' id='request-interval' onChange={this.onFilterChange}>
                    <option value='--'>All</option>
                    <option value='week'>Last week</option>
                    <option value='month'>Last month</option>
                    <option value='months3'>Last 3 months</option>
                    <option value='months6'>Last 6 months</option>
                    <option value='year'>Last year</option>
                  </select>
                </div>
              </form>
            </div>

            {this.renderRequestList()}
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
    requests: state.requests,
    generalStats: state.generalStats,
    user: state.user
  };
}

function dispatcher (dispatch) {
  return {
    _fetchRequests: (...args) => dispatch(fetchRequests(...args)),
    _fetchGeneralStats: (...args) => dispatch(fetchGeneralStats(...args)),
    _invalidateRequests: (...args) => dispatch(invalidateRequests(...args))
  };
}

module.exports = connect(selector, dispatcher)(Home);
