/* eslint no-unused-vars:0 */
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'lodash';
import styleManager from '../utils/styleManager';
import { RECEIVE_TASK, RECEIVE_TASKS, RECEIVE_USER_TASKS, SET_MAP_LAYER,
  RESET_MAP_LAYER, FINISH_POST_TASK } from '../actions';
import { SET_MAP_LOCATION, SET_MAP_SIZE, SET_TASK_GEOJSON, SET_DRAW_MODE,
  SET_SELECTED_FEATURE_ID, RECEIVE_UPLOAD } from '../actions/actionTypes';
import { geometryToFeature } from '../utils/features';
import baseLayers from '../utils/map-layers';

const style = styleManager.getInitialStyle();
export const directSelect = 'direct_select';
export const featureId = 'task-feature';
export const drawPolygon = 'draw_polygon';

export const initialState = {
  mapHeight: 2,
  mapWidth: 4,
  style,
  taskGeojson: undefined,
  drawMode: drawPolygon,
  selectedFeatureId: undefined,
  baseLayers,
  baseLayer: baseLayers[0]
};

function parseTaskId (locationString) {
  let taskId;
  const locationParts = locationString.split('/');
  if (locationParts[3] && locationParts[3] === 'tasks' && locationParts[5] &&
      locationParts[5] === 'edit') {
    taskId = locationParts[4];
  }
  return taskId;
}

function checkRequestLocation (locationString) {
  let isRequest = false;
  const locationParts = locationString.split('/');
  if (locationParts.length === 3 && locationParts[1] === 'requests') {
    isRequest = true;
  }
  return isRequest;
}

function checkNewTaskLocation (locationString) {
  let isNewTask = false;
  const locationParts = locationString.split('/');
  if (locationParts[3] && locationParts[3] === 'tasks' && locationParts[4] &&
      locationParts[4] === 'edit') {
    isNewTask = true;
  }
  return isNewTask;
}

function checkLocationDashboard (locationString) {
  let isDashboard = false;
  const locationParts = locationString.split('/');
  if (locationParts[1] === 'dashboard') {
    isDashboard = true;
  }
  return isDashboard;
}

function receiveTask (state, action) {
  let newState;
  if (!action.error && action.data.geometry) {
    const geojson = geometryToFeature(action.data.geometry);
    geojson.id = featureId;
    const size = { height: state.mapHeight, width: state.mapWidth };
    const style = styleManager.getZoomedStyle(geojson, size, state.style);
    newState = Object.assign({}, state, {
      style: style,
      taskGeojson: geojson,
      drawMode: directSelect,
      selectedFeatureId: featureId
    });
  } else {
    newState = state;
  }
  return newState;
}

function setTaskGeoJSON (state, action) {
  return Object.assign({}, state, {
    taskGeojson: action.geojson,
    selectedFeatureId: action.geojson ? action.geojson.id : undefined,
    drawMode: action.geojson ? state.drawMode : drawPolygon
  });
}

function receiveUpload (state, action) {
  const taskGeojson = geometryToFeature(action.geojson);
  const size = { height: state.mapHeight, width: state.mapWidth };
  const style = styleManager.getZoomedStyle(taskGeojson, size, state.style);
  taskGeojson.id = featureId;

  return Object.assign({}, state, {
    taskGeojson,
    selectedFeatureId: featureId,
    drawMode: directSelect,
    style
  });
}

function receiveTasks (state, action) {
  let tasks;
  if (action.data.results) {
    tasks = geometryToFeature(action.data.results, result => {
      return _.omit(result, ['geometry', 'updates']);
    });
  }

  let tasksStyle;
  if (tasks) {
    tasksStyle = styleManager.setGeoJSONData(tasks, state.style);
  }

  let zoomedStyle;
  // When there is not geojson for the task zoom the map to the shadow tasks.
  if (!state.taskGeojson && tasks) {
    const size = { height: state.mapHeight, width: state.mapWidth };
    zoomedStyle = styleManager.getZoomedStyle(tasks, size, tasksStyle);
  }
  return Object.assign({}, state,
                       { style: zoomedStyle || tasksStyle || state.style });
}

function setMapLayer (state, action) {
  const layer = action.layer;
  const newStyle = styleManager.setSource(
    state.style, layer.name, layer.url, layer.type
  );
  return Object.assign({}, state, {
    baseLayer: action.layer,
    style: newStyle
  });
}

function setMapSize (state, action) {
  let style;
  const taskGeojson = state.taskGeojson;
  if (taskGeojson && taskGeojson.geometry &&
      taskGeojson.geometry.coordinates) {
    style = styleManager.getZoomedStyle(taskGeojson, action.size, state.style);
  } else {
    style = styleManager.getSourceZoomedStyle(action.size, state.style);
  }

  return Object.assign({}, state, {
    mapHeight: action.size.height,
    mapWidth: action.size.width,
    style
  });
}

function handleLocationChange (state, action) {
  const taskId = parseTaskId(action.payload.pathname);
  const isRequestsPage = checkRequestLocation(action.payload.pathname);
  const isNewTask = checkNewTaskLocation(action.payload.pathname);
  const isDashboard = checkLocationDashboard(action.payload.pathname);

  let newState = Object.assign({}, setTaskGeoJSON(state, { geojson: undefined }));
  if (taskId) {
    const style = styleManager.getFilteredTaskIdStyle(taskId, state.style);
    newState = Object.assign({}, state, { style });
  }
  if (isNewTask || isDashboard) {
    const style = styleManager.getTaskStatusStyle(state.style);
    newState = Object.assign({}, setTaskGeoJSON(state, { geojson: undefined }),
                             { style });
  }
  if (isRequestsPage) {
    const style = styleManager.getTaskStatusStyle(state.style);
    newState = Object.assign({}, setTaskGeoJSON(state, { geojson: undefined }),
                         { style });
  }
  return newState;
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      const location = action.location;
      const newStyle = styleManager.setCenter(
        styleManager.setZoom(state.style, location.zoom), location);
      return Object.assign({}, state, { style: newStyle });

    case RECEIVE_TASK:
      return receiveTask(state, action);

    case RECEIVE_TASKS:
      return receiveTasks(state, action);

    case RECEIVE_USER_TASKS:
      return receiveTasks(state, action);

    case LOCATION_CHANGE:
      return handleLocationChange(state, action);

    case FINISH_POST_TASK:
      return setTaskGeoJSON(state, { geojson: undefined });

    case SET_MAP_SIZE:
      return setMapSize(state, action);

    case SET_TASK_GEOJSON:
      return setTaskGeoJSON(state, action);

    case RECEIVE_UPLOAD:
      return receiveUpload(state, action);

    case SET_DRAW_MODE:
      return Object.assign({}, state, { drawMode: action.drawMode });

    case SET_SELECTED_FEATURE_ID:
      return Object.assign({}, state, { selectedFeatureId: action.id });

    case SET_MAP_LAYER:
      return setMapLayer(state, action);

    case RESET_MAP_LAYER:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}
