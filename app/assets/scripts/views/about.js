'use strict';
import React from 'react';
import { connect } from 'react-redux';

var About = React.createClass({
  displayName: 'About',

  propTypes: {
  },

  render: function () {
    return (
      <section className='section section--page section--about'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>About</h1>
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            <div className='prose prose--responsive'>
              <p>Timely access to aerial imagery is critical for disaster response. The Imagery Coordination tool allows people to coordinate and track progress on the collection of satellite and UAV imagery around the globe.</p>
              <p>The tool is an initiative by the <a href="http://hotosm.org">Humanitarian OpenStreetMap Team</a> and currently in beta. Check the <a href="https://github.com/hotosm/imagery-requests">Github project</a> to know more about how to contribute to this project.</p>
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
  };
}

function dispatcher (dispatch) {
  return {
  };
}

module.exports = connect(selector, dispatcher)(About);
