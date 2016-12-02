'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import users from './users';
import request from './request';
import requests from './requests';
import tasks from './tasks';
import generalStats from './general-stats';

export const reducers = {
  user,
  users,
  request,
  requests,
  tasks,
  generalStats
};

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));
