import fetch from 'isomorphic-fetch';
import { stringify as buildAPIQS } from 'qs';

import config from '../config';
import store from '../utils/store';

export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const REQUEST_REQUESTS = 'REQUEST_REQUESTS';
export const RECEIVE_REQUESTS = 'RECEIVE_REQUESTS';
export const INVALIDATE_REQUESTS = 'INVALIDATE_REQUESTS';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const REQUEST_GENERAL_STATS = 'REQUEST_GENERAL_STATS';
export const RECEIVE_GENERAL_STATS = 'RECEIVE_GENERAL_STATS';

export const REQUEST_REQUEST = 'REQUEST_REQUEST';
export const RECEIVE_REQUEST = 'RECEIVE_REQUEST';
export const INVALIDATE_REQUEST = 'INVALIDATE_REQUEST';

export const REQUEST_TASKS = 'REQUEST_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const INVALIDATE_TASKS = 'INVALIDATE_TASKS';

export const REQUEST_TASK = 'REQUEST_TASK';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const INVALIDATE_TASK = 'INVALIDATE_TASK';

export const SELECT_DASHBOARD_TAB = 'SELECT_DASHBOARD_TAB';

export const REQUEST_USER_TASKS = 'REQUEST_USER_TASKS';
export const RECEIVE_USER_TASKS = 'RECEIVE_USER_TASKS';
export const INVALIDATE_USER_TASKS = 'INVALIDATE_USER_TASKS';

export const START_ADD_TASK_STATUS_UPDATE = 'START_ADD_TASK_STATUS_UPDATE';
export const FINISH_ADD_TASK_STATUS_UPDATE = 'FINISH_ADD_TASK_STATUS_UPDATE';

export const RESET_REQUEST_FORM = 'RESET_REQUEST_FORM';
export const START_POST_REQUEST = 'START_POST_REQUEST';
export const FINISH_POST_REQUEST = 'FINISH_POST_REQUEST';

export const RESET_TASK_FORM = 'RESET_TASK_FORM';
export const START_POST_TASK = 'START_POST_TASK';
export const FINISH_POST_TASK = 'FINISH_POST_TASK';

export const START_DELETE_REQUEST = 'START_DELETE_REQUEST';
export const FINISH_DELETE_REQUEST = 'FINISH_DELETE_REQUEST';

export const START_DELETE_TASK = 'START_DELETE_TASK';
export const FINISH_DELETE_TASK = 'FINISH_DELETE_TASK';

export const SET_MAP_LAYER = 'SET_MAP_LAYER';
export const RESET_MAP_LAYER = 'SET_MAP_LAYER';

export const SET_SEARCH_MAP_BASELAYER = 'SET_SEARCH_MAP_BASELAYER';
export const SET_SEARCH_MAP_CENTER = 'SET_SEARCH_MAP_CENTER';
export const SET_SEARCH_MAP_ZOOM = 'SET_SEARCH_MAP_ZOOM';
export const RESET_SEARCH_MAP = 'RESET_SEARCH_MAP';

// User

export function setUserToken (token) {
  return { type: SET_USER_TOKEN, data: token };
}

export function setUserProfile (profile) {
  return { type: SET_USER_PROFILE, data: profile };
}

export function logoutUser () {
  return { type: LOGOUT_USER };
}

// Requests

export function invalidateRequests () {
  return { type: INVALIDATE_REQUESTS };
}

export function requestRequests () {
  return { type: REQUEST_REQUESTS };
}

export function receiveRequests (requests, error = null) {
  return { type: RECEIVE_REQUESTS, data: requests, error, receivedAt: Date.now() };
}

export function fetchRequests (filters = {}) {
  filters.limit = 20;
  let f = buildAPIQS(filters);
  return fetcher(`${config.api}/requests?${f}`, requestRequests, receiveRequests);
}

// Request

export function invalidateRequest () {
  return { type: INVALIDATE_REQUEST };
}

export function requestRequest () {
  return { type: REQUEST_REQUEST };
}

export function receiveRequest (request, error = null) {
  return { type: RECEIVE_REQUEST, data: request, error, receivedAt: Date.now() };
}

export function fetchRequest (uid, filters) {
  let f = buildAPIQS(filters);
  return fetcher(`${config.api}/requests/${uid}?${f}`, requestRequest, receiveRequest);
}

// Tasks

export function invalidateTasks () {
  return { type: INVALIDATE_TASKS };
}

export function requestTasks () {
  return { type: REQUEST_TASKS };
}

export function receiveTasks (tasks, error = null) {
  return { type: RECEIVE_TASKS, data: tasks, error, receivedAt: Date.now() };
}

export function fetchRequestTasks (reqid) {
  return fetcher(`${config.api}/requests/${reqid}/tasks?limit=100`, requestTasks, receiveTasks);
}

// Task

export function invalidateTask () {
  return { type: INVALIDATE_TASK };
}

export function requestTask () {
  return { type: REQUEST_TASK };
}

export function receiveTask (task, error = null) {
  return { type: RECEIVE_TASK, data: task, error, receivedAt: Date.now() };
}

export function fetchTask (reqid, taskid) {
  return fetcher(`${config.api}/requests/${reqid}/tasks/${taskid}`, requestTask, receiveTask);
}

// Users

export function requestUsers () {
  return { type: REQUEST_USERS };
}

export function receiveUsers (users, error = null) {
  return { type: RECEIVE_USERS, data: users, error, receivedAt: Date.now() };
}

export function fetchUsers () {
  return fetcher(`${config.api}/users`, requestUsers, receiveUsers);
}

// Dashboard

export function selectDashboardTab (tab) {
  return { type: SELECT_DASHBOARD_TAB, tab };
}

// User Tasks

export function invalidateUserTasks () {
  return { type: INVALIDATE_USER_TASKS };
}

export function requestUserTasks () {
  return { type: REQUEST_USER_TASKS };
}

export function receiveUserTasks (tasks, error = null) {
  return { type: RECEIVE_USER_TASKS, data: tasks, error, receivedAt: Date.now() };
}

export function fetchRequestUserTasks (uid, filters = {}) {
  filters.limit = 10;
  let f = buildAPIQS(filters);
  return fetcherAuthenticated(`${config.api}/users/${uid}/tasks?${f}`, requestUserTasks, receiveUserTasks);
}

// User Tasks Status Update

export function startAddTaskStatusUpdate () {
  return { type: START_ADD_TASK_STATUS_UPDATE };
}

export function finishAddTaskStatusUpdate (task, error = null) {
  return { type: FINISH_ADD_TASK_STATUS_UPDATE, data: task, error, receivedAt: Date.now() };
}

export function addTaskStatusUpdate (requid, tuid, data) {
  return postAuthenticated(`${config.api}/requests/${requid}/tasks/${tuid}/updates`, data, startAddTaskStatusUpdate, finishAddTaskStatusUpdate);
}

// Request form related

export function resetRequestFrom () {
  return { type: RESET_REQUEST_FORM };
}

export function startPostRequest () {
  return { type: START_POST_REQUEST };
}

export function finishPostRequest (data, error = null) {
  return { type: FINISH_POST_REQUEST, data: data, error, receivedAt: Date.now() };
}

export function postRequest (data) {
  return postAuthenticated(`${config.api}/requests`, data, startPostRequest, finishPostRequest);
}

export function patchRequest (requid, data) {
  return patchAuthenticated(`${config.api}/requests/${requid}`, data, startPostRequest, finishPostRequest);
}

export function startDeleteRequest () {
  return { type: START_DELETE_REQUEST };
}

export function finishDeleteRequest (data, error = null) {
  return { type: FINISH_DELETE_REQUEST, data: data, error, receivedAt: Date.now() };
}

export function deleteRequest (requid, tuid) {
  return deleteAuthenticated(`${config.api}/requests/${requid}`, startDeleteRequest, finishDeleteRequest);
}

// Task form related

export function resetTaskFrom () {
  return { type: RESET_TASK_FORM };
}

export function startPostTask () {
  return { type: START_POST_TASK };
}

export function finishPostTask (data, error = null) {
  return { type: FINISH_POST_TASK, data: data, error, receivedAt: Date.now() };
}

export function postTask (requid, data) {
  return postAuthenticated(`${config.api}/requests/${requid}/tasks`, data, startPostTask, finishPostTask);
}

export function patchTask (requid, tuid, data) {
  return patchAuthenticated(`${config.api}/requests/${requid}/tasks/${tuid}`, data, startPostTask, finishPostTask);
}

export function startDeleteTask () {
  return { type: START_DELETE_TASK };
}

export function finishDeleteTask (data, error = null) {
  return { type: FINISH_DELETE_TASK, data: data, error, receivedAt: Date.now() };
}

export function deleteTask (requid, tuid) {
  return deleteAuthenticated(`${config.api}/requests/${requid}/tasks/${tuid}`, startDeleteTask, finishDeleteTask);
}

// Stats

export function requestGeneralStats () {
  return { type: REQUEST_GENERAL_STATS };
}

export function receiveGeneralStats (users, error = null) {
  return { type: RECEIVE_GENERAL_STATS, data: users, error, receivedAt: Date.now() };
}

export function fetchGeneralStats () {
  return fetcher(`${config.api}/stats`, requestGeneralStats, receiveGeneralStats);
}

// Map

export function setMapBaseLayer (layer) {
  return { type: SET_MAP_LAYER, layer };
}

export function resetMapBaseLayer () {
  return { type: RESET_MAP_LAYER };
}

// Search Map

export function resetSearchMap () {
  return { type: RESET_SEARCH_MAP };
}

export function setSearchMapBaseLayer (layer) {
  return { type: SET_SEARCH_MAP_BASELAYER, layer };
}

export function setSearchMapBaseCenter (center) {
  return { type: SET_SEARCH_MAP_CENTER, center };
}

export function setSearchMapBaseZoom (zoom) {
  return { type: SET_SEARCH_MAP_ZOOM, zoom };
}

// Fetcher function

function f (url, options, requestFn, receiveFn) {
  return function (dispatch, getState) {
    dispatch(requestFn());

    fetch(url, options)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(json => {
        dispatch(receiveFn(json));
      }, e => {
        console.log('e', e);
        return dispatch(receiveFn(null, 'Data not available'));
      });
  };
}

function fetcher (url, requestFn, receiveFn) {
  return f(url, null, requestFn, receiveFn);
}

function fetcherAuthenticated (url, requestFn, receiveFn) {
  let opt = {
    headers: {
      'Authorization': `Bearer ${store.getState().user.token}`
    }
  };
  return f(url, opt, requestFn, receiveFn);
}

function postAuthenticated (url, data, requestFn, receiveFn) {
  let opt = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${store.getState().user.token}`
    },
    body: JSON.stringify(data)
  };
  return f(url, opt, requestFn, receiveFn);
}

function patchAuthenticated (url, data, requestFn, receiveFn) {
  let opt = {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${store.getState().user.token}`
    },
    body: JSON.stringify(data)
  };
  return f(url, opt, requestFn, receiveFn);
}

function deleteAuthenticated (url, requestFn, receiveFn) {
  let opt = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${store.getState().user.token}`
    }
  };
  return f(url, opt, requestFn, receiveFn);
}
