'use strict';
import React from 'react';
import { connect } from 'react-redux';

var Dashboard = React.createClass({
  displayName: 'Dashboard',

  propTypes: {
  },

  render: function () {
    return (
      <section className='section section--hub'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>Tasks</h1>
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            User tasks here
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
  };
}

function dispatcher (dispatch) {
  return {
  };
}

module.exports = connect(selector, dispatcher)(Dashboard);
