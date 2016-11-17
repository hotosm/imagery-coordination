'use strict';
import React from 'react';

var UhOh = React.createClass({
  displayName: 'UhOh',

  render: function () {
    return (
      <div>
        <h1>Uh Oh!</h1>
        <p>You're seaching for something that doesn't exist...</p>
      </div>
    );
  }
});

// /////////////////////////////////////////////////////////////////// //
// Connect functions

export default UhOh;
