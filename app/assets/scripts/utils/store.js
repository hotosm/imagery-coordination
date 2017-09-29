/* eslint spaced-comment: 0 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

//import config from '../config';
import reducer from '../reducers';
import { getProfileLocalStorage, getTokenLocalStorage } from './auth-service';

const initialState = {
  user: {
    token: getTokenLocalStorage(),
    profile: getProfileLocalStorage()
  }
};

//const logger = createLogger({
  //level: 'info',
  //collapsed: true,
  //predicate: (getState, action) => {
    //return (config.environment !== 'production');
  //}
//});

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));

module.exports = store;
