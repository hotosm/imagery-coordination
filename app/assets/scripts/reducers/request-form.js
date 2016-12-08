import { START_POST_REQUEST, FINISH_POST_REQUEST, RESET_REQUEST_FORM } from '../actions';

const initialState = {
  processing: false,
  error: null,
  data: {}
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case RESET_REQUEST_FORM:
      return Object.assign({}, state, initialState);
    case START_POST_REQUEST:
      return Object.assign({}, state, {processing: true});
    case FINISH_POST_REQUEST:
      state = Object.assign({}, state, { processing: false });
      if (action.error) {
        state.error = action.error;
      } else {
        state.data = action.data.results || action.data;
      }
      break;
  }
  return state;
}
