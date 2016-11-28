import { SET_USER_TOKEN, SET_USER_PROFILE, LOGOUT_USER } from '../actions';

export const initialState = {
  token: '',
  profile: null
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_USER_TOKEN:
      return Object.assign({}, state, { token: action.data });
    case SET_USER_PROFILE:
      return Object.assign({}, state, { profile: action.data });
    case LOGOUT_USER:
      return Object.assign({}, state, { profile: null, token: '' });
    default:
      return state;
  }
}
