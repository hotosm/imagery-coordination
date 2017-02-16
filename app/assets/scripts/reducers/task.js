import _ from 'lodash';

import { INVALIDATE_TASK, REQUEST_TASK, RECEIVE_TASK,
  START_ADD_TASK_STATUS_UPDATE, FINISH_ADD_TASK_STATUS_UPDATE } from '../actions';

const initialState = {
  fetching: false,
  fetched: false,
  data: { },

  statusUpdate: {
    processing: false,
    error: null
  }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_TASK:
      return Object.assign({}, state, initialState);
    case REQUEST_TASK:
      return Object.assign({}, state, { error: null, fetching: true, fetched: false });
    case RECEIVE_TASK:
      state = Object.assign({}, state, { fetching: false, fetched: true });
      if (action.error) {
        state.error = action.error;
      } else {
        state.data = action.data;
      }
      break;
    case START_ADD_TASK_STATUS_UPDATE:
      state = _.cloneDeep(state);
      state.statusUpdate.processing = true;
      return state;
    case FINISH_ADD_TASK_STATUS_UPDATE:
      state = _.cloneDeep(state);
      state.statusUpdate.processing = false;
      if (action.error) {
        state.statusUpdate.error = action.error;
      } else {
        state.data = action.data;
      }
      break;
  }
  return state;
}
