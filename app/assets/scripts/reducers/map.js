import baseLayers from '../utils/map-layers';
import { SET_MAP_LAYER, RESET_MAP_LAYER } from '../actions';

export const initialState = {
  baseLayer: baseLayers[0]
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LAYER:
      return Object.assign({}, state, { baseLayer: action.layer });
    case RESET_MAP_LAYER:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
