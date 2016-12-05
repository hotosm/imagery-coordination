import { INVALIDATE_TASK, REQUEST_TASK, RECEIVE_TASK } from '../actions';

const initialState = {
  fetching: false,
  fetched: false,
  data: { }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_TASK:
      return Object.assign({}, state, initialState);
    case REQUEST_TASK:
      return Object.assign({}, state, { error: null, fetching: true });
    case RECEIVE_TASK:
      state = Object.assign({}, state, { fetching: false, fetched: true });
      if (action.error) {
        state.error = action.error;
      } else {
        state.data = action.data;
      }
      break;
  }
  return state;
}
