import test from 'tape';
import sinon from 'sinon';
import { LOCATION_CHANGE } from 'react-router-redux';
import styleManager from '../../app/assets/scripts/utils/styleManager';
import mapReducer, { featureId, drawPolygon, directSelect }
  from '../../app/assets/scripts/reducers/map';
import { RECEIVE_TASK, RECEIVE_TASKS, SET_MAP_LAYER }
  from '../../app/assets/scripts/actions';
import * as actions from '../../app/assets/scripts/actions/actionTypes';

test('map reducer initial state', t => {
  t.plan(8);
  const initialState = mapReducer(undefined, {});
  t.is(typeof (initialState.mapHeight), 'number',
         'Initial state mapHeight is a number');
  t.is(typeof (initialState.mapWidth), 'number',
    'Initial state mapWidth is a number');
  t.ok(initialState.style, 'Initial state has base style loaded');
  t.notOk(initialState.taskId, 'Initial state has no taskId set');
  t.notOk(initialState.taskGeojson, 'Initial state has no taskGeojson set');
  t.equal(initialState.drawMode, drawPolygon,
          'Initial state draw mode is draw polygon');
  t.true(Array.isArray(initialState.baseLayers),
         'Initial state has base layers array loaded');
  t.ok(initialState.baseLayer, 'Initial state has selected base layer object');
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
  const geometryToFeature = sinon.spy(() => { return {}; });
  mapReducer.__Rewire__('geometryToFeature', geometryToFeature);
  const getZoomedStyle = sinon.stub(styleManager, 'getZoomedStyle')
    .returns({ zoom: 0 });

  const receiveTask = {
    type: RECEIVE_TASK,
    data: { geometry: { coordinates: 1 } }
  };
  let state = mapReducer({}, receiveTask);

  t.plan(7);
  t.deepEqual(geometryToFeature.getCall(0).args[0], receiveTask.data.geometry,
              'Action geometry gets converted to geojson features by geometryToFeature');
  t.deepEqual(getZoomedStyle.getCall(0).args[0], receiveTask.data.geometry,
              'Gets new zoomed style using the task geometry with getZoomedStyle');
  t.equal(state.style.zoom, 0, 'Sets style to the new zoomed style');
  t.equal(state.taskGeojson.id, featureId,
          'Sets the taskGeojson id to the featureId constant used in the app');
  t.equal(state.drawMode, directSelect, 'Sets the drawMode to direct select');
  t.equal(state.selectedFeatureId, featureId,
          'Sets the selectedFeatureId to the featureId constant used in the app');

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
  const geometryToFeature = sinon.spy(() => { return {}; });
  mapReducer.__Rewire__('geometryToFeature', geometryToFeature);

  const setGeoJSONData = sinon.stub(styleManager, 'setGeoJSONData')
    .returns({ name: true });

  const currentTaskId = 1;
  const receiveTasks = {
    type: RECEIVE_TASKS,
    data: {
      results: [{ _id: currentTaskId }, { _id: 2 }]
    }
  };
  const state = mapReducer({ taskId: currentTaskId }, receiveTasks);

  t.plan(3);
  t.deepEqual(geometryToFeature.getCall(0).args[0][0], { _id: 2 },
             'Filters the existing task from being added to the geoJSON' +
               ' source to support shadow features');
  t.ok(setGeoJSONData.calledOnce,
              'Sets new style geoJSON source to use the new filtered tasks');
  t.ok(state.style.name, 'Updates state style with new style');

  geometryToFeature.reset();
  setGeoJSONData.restore();
  mapReducer.__ResetDependency__('geometryToFeature');
});

test('map LOCATION_CHANGE', t => {
  const locationChange = {
    type: LOCATION_CHANGE,
    payload: { pathname: '/requests/requestid/tasks/taskid/edit' }
  };
  const state = mapReducer({}, locationChange);
  t.plan(1);
  t.equal(state.taskId, 'taskid',
          'Sets the current taskId when ' +
            'location changes to route containing taskid');
});

test('map SET_MAP_SIZE handles map resize to control fit bounds', t => {
  const getZoomedStyle = sinon.stub(styleManager, 'getZoomedStyle')
    .returns({ name: true });

  const setMapSize = {
    type: actions.SET_MAP_SIZE,
    size: { height: 1, width: 1 }
  };
  const prevStyle = { name: true };
  let state = mapReducer({ style: prevStyle }, setMapSize);

  t.plan(6);
  t.equal(state.mapHeight, setMapSize.size.height, 'Sets mapHeight');
  t.equal(state.mapWidth, setMapSize.size.width, 'Sets mapWidth');
  t.deepEqual(state.style, prevStyle,
              'Retains original style when current' +
              ' state does not contain taskGeojson');
  state = mapReducer({ taskGeojson: { geometry: { coordinates: ['test'] } } },
                        setMapSize);
  t.equal(getZoomedStyle.getCall(0).args[0], 'test',
          'Uses first coordinate ring to get new zoomed style');
  t.deepEqual(getZoomedStyle.getCall(0).args[1], setMapSize.size,
             'Uses new map size to get new zoomed style');
  t.ok(state.style.name, 'Updates style with the new zoomed style');
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
  t.equal(state.drawMode, drawPolygon);

  const setTaskGeojson = {
    type: actions.SET_TASK_GEOJSON,
    geojson: true
  };

  state = mapReducer(initialState, setTaskGeojson);
  t.ok(state.taskGeojson);
  t.equal(state.selectedFeatureId, featureId);
  t.equal(state.drawMode, initialState.drawMode);
});

