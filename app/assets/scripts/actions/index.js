import fetch from 'isomorphic-fetch';
import config from '../config';

export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REQUEST_REQUESTS = 'REQUEST_REQUESTS';
export const RECEIVE_REQUESTS = 'RECEIVE_REQUESTS';

export function setUserToken (token) {
  return { type: SET_USER_TOKEN, data: token };
}

export function setUserProfile (profile) {
  return { type: SET_USER_PROFILE, data: profile };
}

export function logoutUser () {
  return { type: LOGOUT_USER };
}

export function requestRequests () {
  return { type: REQUEST_REQUESTS };
}

export function receiveRequests (requests, error = null) {
  return { type: RECEIVE_REQUESTS, data: requests, error, receivedAt: Date.now() };
}

export function fetchRequests () {
  return function (dispatch, getState) {
    dispatch(requestRequests());

    fetch(`${config.api}/requests`)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(json => {
        dispatch(receiveRequests(json));
      }, e => {
        console.log('e', e);
        return dispatch(receiveRequests(null, 'Data not available'));
      });
  };
}
