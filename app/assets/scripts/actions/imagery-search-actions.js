import * as actions from './actionTypes';

export function setSearchMapCenter (center) {
  return { type: actions.SET_SEARCH_MAP_CENTER, center };
}

export function setSearchMapZoom (zoom) {
  return { type: actions.SET_SEARCH_MAP_ZOOM, zoom };
}

export function setSearchMapBaseLayer (index) {
  return { type: actions.SET_SEARCH_MAP_BASELAYER, index: index };
}
