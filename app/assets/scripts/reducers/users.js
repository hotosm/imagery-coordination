import { REQUEST_USERS, RECEIVE_USERS } from '../actions';

const initialState = {
  fetching: false,
  fetched: false,
  users: []
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, { error: null, fetching: true });
    case RECEIVE_USERS:
      state = Object.assign({}, state, { fetching: false, fetched: true });
      if (action.error) {
        state.error = action.error;
      } else {
        state.users = action.data;
      }
      break;
  }
  return state;
}
