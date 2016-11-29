'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { fetchRequests } from '../actions';

var Home = React.createClass({
  displayName: 'Home',

  propTypes: {
    _fetchRequests: T.func,

    requests: T.object
  },

  componentDidMount: function () {
    this.props._fetchRequests();
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
      return <p>no results</p>;
    }

    return (
      <div>
        <ul className='requests__list'>
          {[1, 2, 3].map(this.renderRequestCard)}
        </ul>

        <div className='pagination-wrapper'>
          <ReactPaginate
            previousLabel={<span>previous</span>}
            nextLabel={<span>next</span>}
            breakLabel={<span className='pages__page'>...</span>}
            pageNum={10}
            forceSelected={5}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={'pagination'}
            subContainerClassName={'pages'}
            pageClassName={'pages__wrapper'}
            pageLinkClassName={'pages__page'}
            activeClassName={'active'} />
        </div>
      </div>
    );
  },

  renderRequestCard: function () {
    return (
      <li className='requests__item'>
        <article className='request'>
          <header className='request__header'>
            <h1 className='request__title'>Request</h1>
          </header>
          <div className='request__body'>
            <p className='status-indicator status-indicator--close'>open</p>

            <div className='request-progress'>
              <progress value='60' max='100' className='progress-bar' style={{backgroundSize: '60%'}} />
              <p className='progress-value'>60% complete</p>
            </div>

            <ul className='request-tasks-info'>
              <li><strong>3</strong> Active</li>
              <li><strong>2</strong> Complete tasks</li>
            </ul>

            <p className='meta-info'>Created on 2016/10/10 by user</p>
          </div>
        </article>
      </li>
    );
  },

  render: function () {
    console.log('res', this.props.requests);
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
            <ul className='general-stats'>
              <li><strong>17</strong> active requests</li>
              <li><strong>129</strong> closed requests</li>
            </ul>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            <div className='map-container bleed-full'>Map goes here</div>

            <h2>Showing 17 requests</h2>

            <div className='list-filters'>
              <form className='form'>
                <div className='form__group'>
                  <label className='form__label' htmlFor='request-author'>Author</label>
                  <select className='form__control form__control--medium' id='request-author'>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                  </select>
                </div>
                <div className='form__group'>
                  <label className='form__label' htmlFor='request-status'>Status</label>
                  <select className='form__control form__control--medium' id='request-status'>
                    <option value='--'>All</option>
                    <option value='open'>Open</option>
                    <option value='closed'>Closed</option>
                    <option value='canceled'>Canceled</option>
                  </select>
                </div>
                <div className='form__group'>
                  <label className='form__label' htmlFor='request-interval'>Time interval</label>
                  <select className='form__control form__control--medium' id='request-interval'>
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
    requests: state.requests
  };
}

function dispatcher (dispatch) {
  return {
    _fetchRequests: (...args) => dispatch(fetchRequests(...args))
  };
}

module.exports = connect(selector, dispatcher)(Home);
