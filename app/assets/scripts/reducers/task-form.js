import { START_POST_TASK, FINISH_POST_TASK, RESET_TASK_FORM } from '../actions';

const initialState = {
  processing: false,
  error: null,
  data: {}
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case RESET_TASK_FORM:
      return Object.assign({}, state, initialState);
    case START_POST_TASK:
      return Object.assign({}, state, {processing: true});
    case FINISH_POST_TASK:
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
