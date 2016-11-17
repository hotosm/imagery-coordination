'use strict';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import createLogger from 'redux-logger';

import AuthService from './utils/auth-service';
import config from './config';
import reducer from './reducers';

const auth = new AuthService(config.auth0Client, config.auth0Domain);
console.log('auth', auth);

// validate authentication for private routes.
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production');
  }
});

// Views.
import App from './views/app';
import Home from './views/home';
import UhOh from './views/uhoh';

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
const history = syncHistoryWithStore(hashHistory, store);

const scrollerMiddleware = useScroll((prevRouterProps, currRouterProps) => {
  return prevRouterProps &&
    decodeURIComponent(currRouterProps.location.pathname) !== decodeURIComponent(prevRouterProps.location.pathname);
});

render((
  <Provider store={store}>
    <Router history={history} render={applyRouterMiddleware(scrollerMiddleware)}>
      <Route path='/uhoh' component={UhOh} />
      <Route path='/' component={App} auth={auth}>
        <IndexRoute component={Home} pageClass='page--homepage' />
      </Route>
    </Router>
  </Provider>
), document.querySelector('#app-container'));
