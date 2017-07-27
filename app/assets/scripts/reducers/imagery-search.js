import { SET_SEARCH_MAP_BASELAYER, SET_SEARCH_MAP_CENTER, SET_SEARCH_MAP_ZOOM, RESET_SEARCH_MAP } from '../actions';
import { getImagerySearchLayers } from '../utils/map-layers';

const initialState = {
  baseLayer: getImagerySearchLayers()[0],
  center: [0, 0],
  zoom: 2
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case RESET_SEARCH_MAP:
      return Object.assign({}, state, initialState);
    case SET_SEARCH_MAP_BASELAYER:
      return Object.assign({}, state, {baseLayer: action.layer});
    case SET_SEARCH_MAP_CENTER:
      return Object.assign({}, state, { center: action.center });
    case SET_SEARCH_MAP_ZOOM:
      return Object.assign({}, state, { zoom: action.zoom });
  }
  return state;
}
