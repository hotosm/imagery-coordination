import { REQUEST_REQUEST, RECEIVE_REQUEST, INVALIDATE_REQUEST } from '../actions';

const initialState = {
  fetching: false,
  fetched: false,
  data: { }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_REQUEST:
      return Object.assign({}, state, initialState);
    case REQUEST_REQUEST:
      return Object.assign({}, state, { error: null, fetching: true, fetched: false });
    case RECEIVE_REQUEST:
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
