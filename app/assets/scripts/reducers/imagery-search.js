import { LOCATION_CHANGE } from 'react-router-redux';
import { getImagerySearchLayers } from '../utils/map-layers';
import styleManager from '../utils/styleManager';

import { SET_SEARCH_MAP_CENTER, SET_SEARCH_MAP_ZOOM,
  SET_SEARCH_MAP_BASELAYER } from '../actions/actionTypes';

const SET_MAP_LOCATION = 'SET_MAP_LOCATION';
const baseLayerId = 'satellite';
const imagerySearchLayers = getImagerySearchLayers();
const baseLayer = imagerySearchLayers.find(m => m.id === baseLayerId);
const mainMapStyle =
  styleManager.getInitialStyle(baseLayer.name, baseLayer.url, baseLayer.type);

const imageryStyles = imagerySearchLayers.map(m => {
  return styleManager.getInitialStyle(m.name, m.url, m.type);
});

const initialState = {
  mainMapStyle,
  imageryStyles,
  selectedBase: undefined
};

function freshState (state) {
  const newState = Object.assign({}, state);
  newState.imageryStyles =
    state.imageryStyles.slice(0, state.imageryStyles.length + 1);
  return newState;
}

function newExtentStyle (templateStyle, action) {
  if (action.type === SET_SEARCH_MAP_CENTER) {
    return styleManager.setCenter(templateStyle, action.center);
  }
  if (action.type === SET_SEARCH_MAP_ZOOM) {
    return styleManager.setZoom(templateStyle, action.zoom);
  }
  if (action.type === SET_MAP_LOCATION) {
    return styleManager.setCenter(styleManager.setZoom(templateStyle, action.zoom),
                                  action.center);
  }
}

function newExtentState (state, action) {
  const newState = freshState(state);
  newState.mainMapStyle = newExtentStyle(state.mainMapStyle, action);

  state.imageryStyles.forEach((s, i) => {
    const newImageryStyle = newExtentStyle(s, action);
    newState.imageryStyles[i] = newImageryStyle;
  });
  return newState;
}

function newMainMapState (state, index) {
  const newState = freshState(state);
  newState.selectedBase = index;
  const selectedBase = newState.imageryStyles[index];
  const url = selectedBase.sources.rasterSource.tiles[0];
  newState.mainMapStyle = styleManager.setSource(selectedBase,
                                                 selectedBase.name,
                                                 url,
                                                 'raster');
  return newState;
}

function parseLocationString (locationString) {
  let setMapLocation;
  const locationParts = locationString.split('/');
  if (locationParts[1] && locationParts[1] === 'imagery-search') {
    if (locationParts[2]) {
      const parts = locationParts[2].split(',');
      if (parts[0] && parts[1] && parts[2]) {
        setMapLocation = {
          type: SET_MAP_LOCATION,
          center: { lng: Number(parts[0]), lat: Number(parts[1]) },
          zoom: Number(parts[2])
        };
      }
    }
  }
  return setMapLocation;
}

export default function reducer (state = initialState, action) {
  if (action.type) {
    switch (action.type) {
      case SET_SEARCH_MAP_CENTER:
        return newExtentState(state, action);
      case SET_SEARCH_MAP_ZOOM:
        return newExtentState(state, action);
      case SET_SEARCH_MAP_BASELAYER:
        return newMainMapState(state, action.index);
      case LOCATION_CHANGE:
        const setMapLocation = parseLocationString(action.payload.pathname);
        if (setMapLocation) {
          return newExtentState(state, setMapLocation);
        } else {
          return state;
        }
    }
  }
  return state;
}
