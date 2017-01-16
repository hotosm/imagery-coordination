import { REQUEST_ALL_REQUESTS, RECEIVE_ALL_REQUESTS } from '../actions';

const initialState = {
  fetching: false,
  fetched: false,
  data: {
    meta: {
      page: null,
      limit: null,
      found: null
    },
    results: []
  },
  receivedAt: null
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL_REQUESTS:
      return Object.assign({}, state, { error: null, fetching: true });
    case RECEIVE_ALL_REQUESTS:
      state = Object.assign({}, state, { fetching: false, fetched: true });
      if (action.error) {
        state.error = action.error;
        state.receivedAt = 0;
      } else {
        state.data = action.data;
        state.receivedAt = action.receivedAt;
      }
      break;
  }
  return state;
}
