import { SELECT_DASHBOARD_TAB } from '../actions';

const initialState = {
  activeTab: 'assigned'
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SELECT_DASHBOARD_TAB:
      return Object.assign({}, state, { activeTab: action.tab });
  }
  return state;
}
