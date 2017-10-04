import test from 'tape';
import { LOCATION_CHANGE } from 'react-router-redux';
import imagerySearchReducer from
  '../../app/assets/scripts/reducers/imagery-search';
import { getImagerySearchLayers } from
  '../../app/assets/scripts/utils/map-layers';
import * as actions from '../../app/assets/scripts/actions/actionTypes';

test('imagery-search reducer initial state', t => {
  t.plan(4);
  const initialState = imagerySearchReducer(undefined, {});
  t.is(typeof (initialState.mainMapStyle.zoom), 'number',
    'Initial state main style zoom is a number');
  t.true(Array.isArray(initialState.mainMapStyle.center),
    'Initial state main style center is an array');
  t.equal(initialState.imageryStyles.length,
          getImagerySearchLayers().length,
            'Initial state imageryStyles is dervied from map-layers');
  t.false(initialState.createRequestEnabled);
});

test('imagery-search SET_SEARCH_MAP_CENTER updates main map style', t => {
  t.plan(2);
  const setCenter = {
    type: actions.SET_SEARCH_MAP_CENTER,
    center: { lng: 1, lat: 2 }
  };
  const style = imagerySearchReducer(undefined, setCenter).mainMapStyle;
  t.equal(style.center[0], setCenter.center.lng,
         'Correctly sets lng');
  t.equal(style.center[1], setCenter.center.lat,
         'Correctly sets lat');
});

test('imagery-search SET_SEARCH_MAP_CENTER updates imagery styles', t => {
  t.plan(2);
  const setCenter = {
    type: actions.SET_SEARCH_MAP_CENTER,
    center: { lng: 1, lat: 2 }
  };
  const firstStyle = imagerySearchReducer(undefined, setCenter)
    .imageryStyles[0];
  t.equal(firstStyle.center[0], setCenter.center.lng,
         'Correctly sets lng');
  t.equal(firstStyle.center[1], setCenter.center.lat,
         'Correctly sets lat');
});

test('imagery-search SET_SEARCH_MAP_ZOOM updates main map style', t => {
  t.plan(1);
  const setZoom = {
    type: actions.SET_SEARCH_MAP_ZOOM,
    zoom: 12
  };
  const mainMapStyle = imagerySearchReducer(undefined, setZoom).mainMapStyle;
  t.equal(mainMapStyle.zoom, setZoom.zoom, 'Correctly sets zoom');
});

test('imagery-search SET_SEARCH_MAP_ZOOM updates imagery styles', t => {
  t.plan(1);
  const setZoom = {
    type: actions.SET_SEARCH_MAP_ZOOM,
    zoom: 12
  };
  const firstStyle = imagerySearchReducer(undefined, setZoom)
    .imageryStyles[0];
  t.equal(firstStyle.zoom, setZoom.zoom, 'Correctly sets zoom');
});

test('imagery-search SET_SEARCH_MAP_BASELAYER updates main map style', t => {
  t.plan(3);
  const initialState = imagerySearchReducer(undefined, {});
  const selectedImagery = initialState.imageryStyles[2];
  const setBasemap = {
    type: actions.SET_SEARCH_MAP_BASELAYER,
    index: 2
  };
  const resultState = imagerySearchReducer(undefined, setBasemap);
  const mainMapStyle = resultState.mainMapStyle;
  t.equal(resultState.selectedBase, 2, 'Correctly sets selectedBase index');
  t.equal(mainMapStyle.name, selectedImagery.name, 'Correctly sets name');
  t.deepEqual(mainMapStyle.sources.sourceName, selectedImagery.sources.sourceName,
              'Correctly sets sourceName');
});

test('imagery-search LOCATION_CHANGE sets new map location', t => {
  t.plan(4);
  const locationChange = {
    type: LOCATION_CHANGE,
    payload: { pathname: '/imagery-search/1,2,4' }
  };
  const resultState = imagerySearchReducer(undefined, locationChange);
  const mainMapStyle = resultState.mainMapStyle;
  t.equal(mainMapStyle.zoom, 4, 'Correctly sets main map zoom from url params');
  t.deepEqual(mainMapStyle.center, [1, 2],
              'Correctly sets main map center from url params');
  const imageryStyle = resultState.imageryStyles[2];
  t.equal(imageryStyle.zoom, 4,
          'Correctly sets imagery style zoom from url params');
  t.deepEqual(imageryStyle.center, [1, 2],
              'Correctly sets imagery style center from url params');
});

test('imagery-search LOCATION_CHANGE with incomplete params is ignored', t => {
  t.plan(2);
  const initialMainMapStyle = imagerySearchReducer(undefined, {}).mainMapStyle;
  const locationChangeNoCoords = {
    type: LOCATION_CHANGE,
    payload: { pathname: '/imagery-search/' }
  };
  const mainMapStyle = imagerySearchReducer(undefined,
                                        locationChangeNoCoords).mainMapStyle;
  t.equal(mainMapStyle.zoom, initialMainMapStyle.zoom,
          'Makes no state changes when coordinates are not supplied');

  const locationChangeDifferentPath = {
    type: LOCATION_CHANGE,
    payload: { pathname: '/test/' }
  };
  const mainStyle = imagerySearchReducer(undefined,
                                    locationChangeDifferentPath).mainMapStyle;
  t.equal(mainStyle.zoom, initialMainMapStyle.zoom,
          'Makes no state changes when path is not /imagery-search/');
});

test('imagery-search LOCATION_CHANGE with new location enables create request', t => {
  t.plan(1);
  const locationChange = {
    type: LOCATION_CHANGE,
    payload: { pathname: '/imagery-search/1,2,4' }
  };
  const resultState = imagerySearchReducer(undefined, locationChange);
  t.ok(resultState.createRequestEnabled);
});

