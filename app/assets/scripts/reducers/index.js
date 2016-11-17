'use strict';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import example from './example';

export const reducers = {
  example
};

export default combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));
