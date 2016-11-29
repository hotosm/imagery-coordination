'use strict';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import c from 'classnames';

import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';

var App = React.createClass({
  displayName: 'App',

  propTypes: {
    routes: T.array,
    route: T.object,
    children: T.object,

    user: T.object
  },

  render: function () {
    const pageClass = _.get(_.last(this.props.routes), 'pageClass', '');

    return (
      <div className={c('page', pageClass)}>
        <PageHeader
          auth={this.props.route.auth}
          user={this.props.user} />
        <main className='page__body' role='main'>
          {this.props.children}
        </main>
        <PageFooter />
      </div>
    );
  }
});

// /////////////////////////////////////////////////////////////////// //
// Connect functions

function selector (state) {
  return {
    user: state.user
  };
}

function dispatcher (dispatch) {
  return {
  };
}

module.exports = connect(selector, dispatcher)(App);
