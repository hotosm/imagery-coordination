'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import users from './users';
import requests from './requests';
import generalStats from './general-stats';

export const reducers = {
  user,
  users,
  generalStats,
  requests
};

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));
