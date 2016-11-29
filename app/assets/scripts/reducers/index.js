'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';

export const reducers = {
  user
};

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));
