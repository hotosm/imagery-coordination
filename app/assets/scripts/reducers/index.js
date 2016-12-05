'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import users from './users';
import request from './request';
import requests from './requests';
import tasks from './tasks';
import task from './task';
import userTasks from './user-tasks';
import dashboard from './dashboard';
import generalStats from './general-stats';

export const reducers = {
  user,
  users,
  request,
  requests,
  task,
  tasks,
  userTasks,
  dashboard,
  generalStats
};

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));
