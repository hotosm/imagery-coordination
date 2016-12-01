import fetch from 'isomorphic-fetch';
import { stringify as buildAPIQS } from 'qs';

import config from '../config';

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

export function fetchRequest (uid) {
  return fetcher(`${config.api}/requests/${uid}`, requestRequest, receiveRequest);
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

// Fetcher function

function fetcher (url, requestFn, receiveFn) {
  return function (dispatch, getState) {
    dispatch(requestFn());

    fetch(url)
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
