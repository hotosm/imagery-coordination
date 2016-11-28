import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import config from '../config';
import reducer from '../reducers';
import { getProfileLocalStorage, getTokenLocalStorage } from './auth-service';

const initialState = {
  user: {
    token: getTokenLocalStorage(),
    profile: getProfileLocalStorage()
  }
};

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production');
  }
});

const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware, logger));

module.exports = store;
