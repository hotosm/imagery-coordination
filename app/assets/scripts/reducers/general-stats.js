import { REQUEST_GENERAL_STATS, RECEIVE_GENERAL_STATS } from '../actions';

export const initialState = {
  fetching: false,
  fetched: false,
  data: {
    requests: null
  }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_GENERAL_STATS:
      return Object.assign({}, state, { error: null, fetching: true, fetched: false });
    case RECEIVE_GENERAL_STATS:
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
