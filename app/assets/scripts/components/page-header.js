'use strict';
import React, { PropTypes as T } from 'react';

import AuthService from '../utils/auth-service';

var PageHeader = React.createClass({
  displayName: 'PageHeader',

  propTypes: {
    auth: T.instanceOf(AuthService)
  },

  getInitialState: function () {
    return {
      logged: this.props.auth.loggedIn()
    };
  },

  componentDidMount: function () {
    this.props.auth.on('login', () => this.setState({logged: true}));
  },

  logout: function () {
    this.props.auth.logout();
    this.setState({logged: false});
  },

  render: function () {
    const auth = this.props.auth;
    return (
      <header className='page__header' role='banner'>
        <div className='inner'>
          <div className='page__headline'>
            <h1 className='page__title'>
              <a href='/' title='Visit homepage'>Imagery Requests</a>
            </h1>
          </div>
          <nav className='page__prime-nav' role='navigation'>
            {this.state.logged
              ? <button className='button button--base' onClick={this.logout}>Logout</button>
              : <button className='button button--primary' onClick={auth.login.bind(this)}>Login</button>
            }
          </nav>
          <p style={{'wordBreak': 'break-all', marginTop: '5rem'}}>
            {this.state.logged ? auth.getToken() : null}
          </p>
        </div>
      </header>
    );
  }
});

module.exports = PageHeader;
