'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import requests from './requests';

export const reducers = {
  user,
  requests
};

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));
