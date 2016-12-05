'use strict';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { syncHistoryWithStore } from 'react-router-redux';

import AuthService, { isLoggedIn } from './utils/auth-service';
import config from './config';
import store from './utils/store';

const auth = new AuthService(config.auth0Client, config.auth0Domain);

// validate authentication for private routes.
const requireAuth = (nextState, replace) => {
  if (!isLoggedIn(store.getState().user.token)) {
    replace({ pathname: '/' });
  }
};

// Views.
import App from './views/app';
import Home from './views/home';
import UhOh from './views/uhoh';
import Dashboard from './views/dashboard';
import Request from './views/request-page';
import Task from './views/task-page';
import About from './views/about';

const history = syncHistoryWithStore(hashHistory, store);

const scrollerMiddleware = useScroll((prevRouterProps, currRouterProps) => {
  return prevRouterProps &&
    decodeURIComponent(currRouterProps.location.pathname) !== decodeURIComponent(prevRouterProps.location.pathname);
});

import { fetchUsers } from './actions';
store.dispatch(fetchUsers());

render((
  <Provider store={store}>
    <Router history={history} render={applyRouterMiddleware(scrollerMiddleware)}>
      <Route path='/404' component={UhOh} />
      <Route path='/' component={App} auth={auth}>
        <Route path='/dashboard' component={Dashboard} onEnter={requireAuth}/>
        <Route path='/about' component={About}/>
        <Route path='/requests/:reqid' component={Request}/>
        <Route path='/requests/:reqid/tasks/:taskid' component={Task}/>
        <IndexRoute component={Home} pageClass='page--homepage' />
      </Route>
    </Router>
  </Provider>
), document.querySelector('#app-container'));
