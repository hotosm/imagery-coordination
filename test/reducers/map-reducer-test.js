import test from 'tape';
import sinon from 'sinon';
import { LOCATION_CHANGE } from 'react-router-redux';
import styleManager from '../../app/assets/scripts/utils/styleManager';
import mapReducer from '../../app/assets/scripts/reducers/map';
import { featureId, simpleSelect, directSelect, staticDraw } from
  '../../app/assets/scripts/utils/constants';
import { RECEIVE_TASK, RECEIVE_TASKS, SET_MAP_LAYER }
  from '../../app/assets/scripts/actions';
import * as actions from '../../app/assets/scripts/actions/actionTypes';

test('map reducer initial state', t => {
  const initialState = mapReducer(undefined, {});
  t.is(typeof (initialState.mapHeight), 'number',
         'Initial state mapHeight is a number');
  t.is(typeof (initialState.mapWidth), 'number',
    'Initial state mapWidth is a number');
  t.ok(initialState.style, 'Initial state has base style loaded');
  t.notOk(initialState.taskGeojson, 'Initial state has no taskGeojson set');
  t.equal(initialState.drawMode, staticDraw,
          'Initial state draw mode is static');
  t.true(Array.isArray(initialState.baseLayers),
         'Initial state has base layers array loaded');
  t.ok(initialState.baseLayer, 'Initial state has selected base layer object');
  t.end();
});

test('map SET_MAP_LOCATION', t => {
  const setCenter = sinon.stub(styleManager, 'setCenter')
    .returns({ center: [0, 0] });
  const setZoom = sinon.stub(styleManager, 'setZoom');
  const setMapLocation = {
    type: actions.SET_MAP_LOCATION,
    location: { lng: 0, lat: 0, zoom: 5 }
  };
  const state = mapReducer({}, setMapLocation);
  t.plan(3);
  t.deepEqual(setZoom.getCall(0).args[1], setMapLocation.location.zoom,
             'SET_MAP_LOCATION sets style zoom');
  t.deepEqual(setCenter.getCall(0).args[1], setMapLocation.location,
             'SET_MAP_LOCATION sets style center');
  t.equal(state.style.center[0], setMapLocation.location.lng,
         'SET_MAP_LOCATION updates style center');
  setCenter.restore();
  setZoom.restore();
});

test('map RECEIVE_TASK', t => {
  const fakeGeojson = { geometry: { coordinates: [] } };
  const geometryToFeature = sinon.spy(() => { return fakeGeojson; });
  mapReducer.__Rewire__('geometryToFeature', geometryToFeature);
  const getZoomedStyle = sinon.stub(styleManager, 'getZoomedStyle')
    .returns({ zoom: 0 });

  const receiveTask = {
    type: RECEIVE_TASK,
    data: { geometry: { coordinates: 1 } }
  };
  let state = mapReducer({}, receiveTask);

  t.plan(6);
  t.deepEqual(geometryToFeature.getCall(0).args[0], receiveTask.data.geometry,
    'Action geometry gets converted to geojson features by geometryToFeature');
  t.deepEqual(getZoomedStyle.getCall(0).args[0], fakeGeojson,
    'Gets new zoomed style using the converted geojson with getZoomedStyle');
  t.equal(state.style.zoom, 0, 'Sets style to the new zoomed style');
  t.equal(state.taskGeojson.id, featureId,
          'Sets the taskGeojson id to the featureId constant used in the app');
  t.equal(state.drawMode, simpleSelect, 'Sets the drawMode to simple select');

  const receiveTaskError = {
    type: RECEIVE_TASK,
    error: true
  };
  const prevState = { prevState: true };
  state = mapReducer(prevState, receiveTaskError);
  t.deepEqual(state, prevState, 'Returns unchange state when action has error');

  geometryToFeature.reset();
  getZoomedStyle.restore();
  mapReducer.__ResetDependency__('geometryToFeature');
});

test('map RECEIVE_TASKS', t => {
  const feature = 'feature';
  const geometryToFeature = sinon.spy(() => { return feature; });
  mapReducer.__Rewire__('geometryToFeature', geometryToFeature);

  const setgeojson = 'setgeojson';
  const setGeoJSONData = sinon.stub(styleManager, 'setGeoJSONData')
    .returns(setgeojson);

  const zoomed = 'zoomed';
  const getZoomedStyle = sinon.stub(styleManager, 'getZoomedStyle')
    .returns(zoomed);

  const noResults = {
    type: RECEIVE_TASKS,
    data: { results: undefined }
  };
  const prevStyle = 'prevStyle';
  let state = mapReducer({ style: prevStyle }, noResults);
  t.plan(6);
  t.equal(state.style, prevStyle,
          'Does not update style when no RECEIVE_TASKS has no results');

  const results = 'results';
  const setsTasksGeojson = {
    type: RECEIVE_TASKS,
    data: { results }
  };
  state = mapReducer({ taskGeojson: true }, setsTasksGeojson);
  t.equal(geometryToFeature.getCall(0).args[0], results,
         'Converts results to geojson featurs');
  t.equal(setGeoJSONData.getCall(0).args[0], feature,
         'Adds the geojson data to the style');
  t.equal(state.style, setgeojson,
         'When there is exisiting taskGeojson uses the style without zooming');

  state = mapReducer({}, setsTasksGeojson);
  t.equal(getZoomedStyle.getCall(0).args[2], setgeojson,
         'Calls getZoomedStyle with resulting style of setGeoJSONData');
  t.equal(state.style, zoomed,
          'Zooms the style to all tasks when there is no exisiting taskGeojson');

  geometryToFeature.reset();
  getZoomedStyle.restore();
  setGeoJSONData.restore();
  mapReducer.__ResetDependency__('geometryToFeature');
});

test('map LOCATION_CHANGE', t => {
  const settaskgeojson = 'settaskgeojson';
  const setTaskGeoJSON = sinon.spy(() => settaskgeojson);
  mapReducer.__Rewire__('setTaskGeoJSON', setTaskGeoJSON);
  const getfiltered = 'getfiltered';
  const getFilteredTaskIdStyle = sinon.stub(styleManager, 'getFilteredTaskIdStyle')
    .returns(getfiltered);

  const taskid = 'taskid';
  const locationChange = {
    type: LOCATION_CHANGE,
    payload: { pathname: `/requests/requestid/tasks/${taskid}/edit` }
  };
  let state = mapReducer({}, locationChange);
  t.equal(getFilteredTaskIdStyle.getCall(0).args[0], taskid,
         'Changing location to edit existing task gets style with that task' +
           ' filtered out');
  t.equal(state.style, getfiltered);

  const newTask = {
    type: LOCATION_CHANGE,
    payload: { pathname: '/requests/requestid/tasks/edit' }
  };
  const gettaskstatus = 'gettaskstatus';
  const getTaskStatusStyle = sinon.stub(styleManager, 'getTaskStatusStyle')
    .returns(gettaskstatus);
  state = mapReducer({}, newTask);
  t.ok(getTaskStatusStyle.called,
       'Changing location to create new task gets style with other request task');
  t.equal(state.style, gettaskstatus);
  t.notOk(state.taskGeojson);

  getTaskStatusStyle.reset();
  const requestsPage = {
    type: LOCATION_CHANGE,
    payload: { pathname: '/requests/requestid' }
  };
  state = mapReducer({}, requestsPage);
  t.ok(getTaskStatusStyle.called);
  t.notOk(state.taskGeojson);

  getTaskStatusStyle.reset();
  getFilteredTaskIdStyle.reset();
  setTaskGeoJSON.reset();
  mapReducer.__ResetDependency__('setTaskGeoJSON');
  t.end();
});

test('map SET_MAP_SIZE handles map resize to control fit bounds', t => {
  const prevStyle = { name: true };
  const getSourceZoomedStyle = sinon.stub(styleManager, 'getSourceZoomedStyle')
    .returns(prevStyle);
  const getZoomedStyle = sinon.stub(styleManager, 'getZoomedStyle')
    .returns({ name: true });

  const setMapSize = {
    type: actions.SET_MAP_SIZE,
    size: { height: 1, width: 1 }
  };
  let state = mapReducer({ style: prevStyle }, setMapSize);

  t.plan(7);
  t.equal(state.mapHeight, setMapSize.size.height, 'Sets mapHeight');
  t.equal(state.mapWidth, setMapSize.size.width, 'Sets mapWidth');
  t.ok(getSourceZoomedStyle.called);
  t.deepEqual(state.style, prevStyle,
              'Retains original style when current' +
              ' state does not contain taskGeojson');

  const taskGeojson = { geometry: { coordinates: ['test'] } };
  state = mapReducer({ taskGeojson: taskGeojson }, setMapSize);

  t.deepEqual(getZoomedStyle.getCall(0).args[0], taskGeojson,
          'Uses current taskGeojson to get new zoomed style');
  t.deepEqual(getZoomedStyle.getCall(0).args[1], setMapSize.size,
             'Uses new map size to get new zoomed style');
  t.ok(state.style.name, 'Updates style with the new zoomed style');
  getSourceZoomedStyle.restore();
  getZoomedStyle.restore();
});

test('map SET_MAP_LAYER', t => {
  const setSource = sinon.stub(styleManager, 'setSource')
    .returns({ name: true });

  const layer = { name: 'name', url: 'url', type: 'raster' };
  const setMapLayer = {
    type: SET_MAP_LAYER,
    layer
  };
  const state = mapReducer({}, setMapLayer);
  t.plan(4);
  t.equal(setSource.getCall(0).args[1], layer.name);
  t.equal(setSource.getCall(0).args[2], layer.url);
  t.equal(setSource.getCall(0).args[3], layer.type);
  t.deepEqual(state.baseLayer, layer);
  setSource.restore();
});

test('map SET_TASK_GEOJSON', t => {
  const setTaskGeojsonUndefined = {
    type: actions.SET_TASK_GEOJSON,
    geojson: undefined
  };

  const initialState = {
    taskGeojson: undefined,
    selectedFeatureId: undefined,
    drawMode: 'test'
  };

  let state = mapReducer(initialState, setTaskGeojsonUndefined);
  t.plan(6);
  t.notOk(state.taskGeojson);
  t.notOk(state.selectedFeatureId);
  t.equal(state.drawMode, staticDraw);

  const geojsonId = 'geojsonId';
  const setTaskGeojson = {
    type: actions.SET_TASK_GEOJSON,
    geojson: { id: geojsonId }
  };

  state = mapReducer(initialState, setTaskGeojson);
  t.ok(state.taskGeojson);
  t.equal(state.selectedFeatureId, geojsonId);
  t.equal(state.drawMode, initialState.drawMode);
});

test('map RECEIVE_UPLOAD', t => {
  const actionGeojson = 'test';
  const features = { coordinates: true };
  const geometryToFeature = sinon.spy(() => features);
  mapReducer.__Rewire__('geometryToFeature', geometryToFeature);
  const getZoomedStyle = sinon.stub(styleManager, 'getZoomedStyle')
    .returns({ name: true });

  const receiveUpload = {
    type: actions.RECEIVE_UPLOAD,
    geojson: actionGeojson
  };
  const state = mapReducer({}, receiveUpload);
  t.plan(6);
  t.equals(geometryToFeature.getCall(0).args[0], actionGeojson);
  t.deepEqual(getZoomedStyle.getCall(0).args[0], features);
  t.equal(state.taskGeojson.id, featureId);
  t.ok(state.style.name);
  t.equal(state.selectedFeatureId, featureId);
  t.equal(state.drawMode, directSelect);

  geometryToFeature.reset();
  getZoomedStyle.restore();
  mapReducer.__ResetDependency__('geometryToFeature');
});
