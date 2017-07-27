'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import users from './users';
import request from './request';
import requests from './requests';
import requestsAll from './requests-all';
import tasks from './tasks';
import task from './task';
import userTasks from './user-tasks';
import dashboard from './dashboard';
import generalStats from './general-stats';
import requestForm from './request-form';
import taskForm from './task-form';
import map from './map';
import imagerySearch from './imagery-search';

export const reducers = {
  user,
  users,
  request,
  requests,
  requestsAll,
  task,
  tasks,
  userTasks,
  dashboard,
  generalStats,
  requestForm,
  taskForm,
  map,
  imagerySearch
};

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));
