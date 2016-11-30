'use strict';
import React from 'react';
import { connect } from 'react-redux';

var RequestPage = React.createClass({
  displayName: 'RequestPage',

  propTypes: {
  },

  render: function () {
    return (
      <section className='section section--hub'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>Request</h1>
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            request page
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

module.exports = connect(selector, dispatcher)(RequestPage);
