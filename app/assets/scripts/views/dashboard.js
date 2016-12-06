'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import c from 'classnames';
import ReactPaginate from 'react-paginate';

import { selectDashboardTab, invalidateUserTasks, fetchRequestUserTasks } from '../actions';
import * as userUtils from '../utils/users';
import { dateFromRelative } from '../utils/utils';

import TaskCard from '../components/task-card';

var Dashboard = React.createClass({
  displayName: 'Dashboard',

  propTypes: {
    _selectDashboardTab: T.func,
    _invalidateUserTasks: T.func,
    _fetchRequestUserTasks: T.func,

    user: T.object,
    dashboard: T.object,
    userTasks: T.object
  },

  componentDidMount: function () {
    this.props._fetchRequestUserTasks(this.props.user.profile.user_id, {scope: this.props.dashboard.activeTab});
  },

  componentWillUnmount: function () {
    this.props._invalidateUserTasks();
  },

  getFilters: function () {
    let f = {};
    if (this.refs['filter-status'].value !== '--') {
      f.status = this.refs['filter-status'].value;
    }
    let dateFrom = dateFromRelative(this.refs['filter-interval'].value);
    if (dateFrom !== null) {
      f.dateFrom = dateFrom;
    }
    return f;
  },

  onFilterChange: function () {
    let filters = this.getFilters();
    filters.scope = this.props.dashboard.activeTab;
    this.props._fetchRequestUserTasks(this.props.user.profile.user_id, filters);
  },

  onTabClick: function (tab, e) {
    e.preventDefault();
    this.props._selectDashboardTab(tab);
    let filters = this.getFilters();
    filters.scope = tab;
    this.props._fetchRequestUserTasks(this.props.user.profile.user_id, filters);
  },

  handlePageClick: function (d) {
    let filters = this.getFilters();
    filters.page = d.selected + 1;
    filters.scope = this.props.dashboard.activeTab;
    this.props._fetchRequestUserTasks(this.props.user.profile.user_id, filters);
  },

  renderUserTasks: function () {
    let { fetched, fetching, error, data } = this.props.userTasks;

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
      return <p>There are no tasks to match the selected filters</p>;
    }

    return (
      <div>
        <ul className='tasks-list'>
          {data.results.map(o => {
            return (
              <li className='tasks-list__item' key={o._id}>
                <TaskCard
                  requestId={o.requestId}
                  id={o._id}
                  name={o.name}
                  status={o.status}
                  authorId={o.authorId}
                  assigneeId={o.assigneeId}
                  updated={o.updated}
                />
              </li>
            );
          })}
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

  render: function () {
    let activeTab = this.props.dashboard.activeTab;

    return (
      <section className='section section--page'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>{userUtils.getNameFromId(this.props.user.profile.user_id)}</h1>
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>

            <div className='col--main'>
              <div className='list-filters'>
                <form className='form'>
                  <div className='form__group'>
                    <label className='form__label' htmlFor='task-status'>Status</label>
                    <select ref='filter-status' className='form__control form__control--medium' id='task-status' onChange={this.onFilterChange}>
                      <option value='--'>All</option>
                      <option value='open'>Open</option>
                      <option value='inprogress'>In Progress</option>
                      <option value='completed'>Completed</option>
                    </select>
                  </div>
                  <div className='form__group'>
                    <label className='form__label' htmlFor='task-interval'>Time interval</label>
                    <select ref='filter-interval' className='form__control form__control--medium' id='task-interval' onChange={this.onFilterChange}>
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

              <ul className='tabbed-nav'>
                <li className={c('tabbed-nav__item', {'tabbed-nav__item--active': activeTab === 'assigned'})} onClick={this.onTabClick.bind(null, 'assigned')}><a href=''>Assigned</a></li>
                <li className={c('tabbed-nav__item', {'tabbed-nav__item--active': activeTab === 'created'})} onClick={this.onTabClick.bind(null, 'created')}><a href=''>Created</a></li>
              </ul>

              <div className='tabbed-content'>
                {this.renderUserTasks()}
              </div>

            </div>

            <div className='col--sec'>
              <div className='map-container'>Map goes here</div>
            </div>

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
    user: state.user,
    dashboard: state.dashboard,
    userTasks: state.userTasks
  };
}

function dispatcher (dispatch) {
  return {
    _selectDashboardTab: (...args) => dispatch(selectDashboardTab(...args)),
    _invalidateUserTasks: (...args) => dispatch(invalidateUserTasks(...args)),
    _fetchRequestUserTasks: (...args) => dispatch(fetchRequestUserTasks(...args))
  };
}

module.exports = connect(selector, dispatcher)(Dashboard);
