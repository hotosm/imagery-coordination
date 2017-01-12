'use strict';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { syncHistoryWithStore } from 'react-router-redux';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';

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

const requireRole = (allowedRoles) => (nextState, replace) => {
  allowedRoles = _.castArray(allowedRoles);
  let user = store.getState().user;
  console.log('user', user);
  let userRoles = _.get(user, 'profile.roles', []);
  let hasRole = allowedRoles.some(o => userRoles.indexOf(o) !== -1);
  if (!isLoggedIn(user.token) || !hasRole) {
    replace({ pathname: '/' });
  }
};

mapboxgl.accessToken = config.mbToken;

// Views.
import App from './views/app';
import Home from './views/home';
import UhOh from './views/uhoh';
import Dashboard from './views/dashboard';
import Request from './views/request-page';
import RequestForm from './views/request-form';
import TaskForm from './views/task-form';
import Task from './views/task-page';
import About from './views/about';
import ImagerySearch from './views/imagery-search';
import ImagerySearch3 from './views/imagery-search-3';
import ImagerySearchSwipe from './views/imagery-search-swipe';
import ImagerySearchThumbs from './views/imagery-search-thumbs';

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
      <Route path='/' component={App} auth={auth}>
        <Route path='/dashboard' component={Dashboard} onEnter={requireAuth} />
        <Route path='/about' component={About}/>
        <Route path='/imagery-search' component={ImagerySearch} onEnter={requireRole('coordinator')} />
        <Route path='/imagery-search3' component={ImagerySearch3} onEnter={requireRole('coordinator')} />
        <Route path='/imagery-search-swipe' component={ImagerySearchSwipe} onEnter={requireRole('coordinator')} />
        <Route path='/imagery-search-thumbs' component={ImagerySearchThumbs} onEnter={requireRole('coordinator')} />
        <Route path='/requests/edit' component={RequestForm} onEnter={requireRole('coordinator')} />
        <Route path='/requests/:reqid/edit' component={RequestForm} onEnter={requireRole('coordinator')} />

        <Route path='/requests/:reqid/tasks/edit' component={TaskForm} onEnter={requireRole('coordinator')} />
        <Route path='/requests/:reqid/tasks/:taskid/edit' component={TaskForm} onEnter={requireRole(['coordinator', 'surveyor'])} />

        <Route path='/requests/:reqid' component={Request} />
        <Route path='/requests/:reqid/tasks/:taskid' component={Task} />
        <IndexRoute component={Home} pageClass='page--homepage' />
        <Route path="*" component={UhOh}/>
      </Route>
    </Router>
  </Provider>
), document.querySelector('#app-container'));
