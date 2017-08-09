import * as actions from './actionTypes';

export function setMapLocation (location) {
  return { type: actions.SET_MAP_LOCATION, location };
}

export function setMapSize (size) {
  return { type: actions.SET_MAP_SIZE, size };
}

export function setTaskGeoJSON (geojson, isUpload) {
  return { type: actions.SET_TASK_GEOJSON, geojson, isUpload };
}

export function setDrawMode (drawMode) {
  return { type: actions.SET_DRAW_MODE, drawMode };
}

export function setSelectedFeatureId (id) {
  return { type: actions.SET_SELECTED_FEATURE_ID, id };
}

export function receiveUpload (geojson) {
  return { type: actions.RECEIVE_UPLOAD, geojson };
}

