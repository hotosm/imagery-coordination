/* eslint no-unused-vars:0 */
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'lodash';
import baseLayers from '../utils/map-layers';
import styleManager from '../utils/styleManager';
import { RECEIVE_TASK, RECEIVE_TASKS } from '../actions';
import { SET_MAP_LOCATION, SET_MAP_SIZE, SET_TASK_GEOJSON, SET_DRAW_MODE,
  SET_SELECTED_FEATURE_ID } from '../actions/actionTypes';
import { geometryToFeature } from '../utils/features';

const style = styleManager.getInitialStyle();
// const simpleSelect = 'simple_select';
const directSelect = 'direct_select';
const featureId = 'task-feature';
const drawPolygon = 'draw_polygon';

export const initialState = {
  mapHeight: 2,
  mapWidth: 4,
  style,
  taskId: undefined,
  taskGeojson: undefined,
  baseLayer: baseLayers[0],
  drawMode: drawPolygon,
  selectedFeatureId: undefined
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

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      const location = action.location;
      const newStyle = styleManager.setCenter(
        styleManager.setZoom(state.style, location.zoom), location);
      return Object.assign({}, state, { style: newStyle });

    case RECEIVE_TASK:
      let newState;
      if (!action.error && action.data.geometry) {
        const geojson = geometryToFeature(action.data.geometry);
        geojson.id = 'task-feature';
        const size = { height: state.mapHeight, width: state.mapWidth };
        const style = styleManager.getZoomedStyle(
          action.data.geometry, size, state.style);
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

    case RECEIVE_TASKS:
      let otherTasks;
      if (action.data.results) {
        const filteredTasks = action.data.results.filter(task =>
                                                task._id !== state.taskId);

        otherTasks = geometryToFeature(filteredTasks, result => {
          return _.omit(result, ['geometry', 'updates']);
        });
      }
      const tasksStyle = styleManager.setGeoJSONData(otherTasks, state.style);
      return Object.assign({}, state, { style: tasksStyle });

    case LOCATION_CHANGE:
      const taskId = parseTaskId(action.payload.pathname);
      if (taskId) {
        return Object.assign({}, state, { taskId: taskId });
      } else {
        return state;
      }

    case SET_MAP_SIZE:
      let style;
      const taskGeojson = state.taskGeojson;
      if (taskGeojson && taskGeojson.geometry &&
          taskGeojson.geometry.coordinates) {
        style = styleManager
          // coordinates from geometryToFeature use rings.
          .getZoomedStyle(taskGeojson.geometry.coordinates[0], action.size, state.style);
      }
      return Object.assign({}, state,
        { mapHeight: action.size.height,
          mapWidth: action.size.width,
          style: style || state.style
        });

    case SET_TASK_GEOJSON:
      return Object.assign({}, state, {
        taskGeojson: action.geojson,
        selectedFeatureId: action.geojson ? featureId : undefined,
        drawMode: action.geojson ? state.drawMode : drawPolygon
      });

    case SET_DRAW_MODE:
      return Object.assign({}, state, { drawMode: action.drawMode });

    case SET_SELECTED_FEATURE_ID:
      return Object.assign({}, state, { selectedFeatureId: action.id });

    default:
      return state;
  }
}
