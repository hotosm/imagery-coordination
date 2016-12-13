'use strict';
import React from 'react';

var UhOh = React.createClass({
  displayName: 'UhOh',

  render: function () {
    return (
      <section className='section section--page'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>Uh Oh!</h1>
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            You're seaching for something that doesn't exist...
          </div>
        </div>
      </section>
    );
  }
});

// /////////////////////////////////////////////////////////////////// //
// Connect functions

export default UhOh;
