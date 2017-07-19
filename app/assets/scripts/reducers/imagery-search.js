import { LOCATION_CHANGE } from 'react-router-redux';
import { getImagerySearchLayers } from '../utils/map-layers';
import { SET_SEARCH_MAP_CENTER, SET_SEARCH_MAP_ZOOM,
  SET_SEARCH_MAP_BASELAYER } from '../actions/actionTypes';

const SET_MAP_LOCATION = 'SET_MAP_LOCATION';
const baseLayerId = 'satellite';
const imagerySearchLayers = getImagerySearchLayers();
const baseLayer = imagerySearchLayers.find(m => m.id === baseLayerId);
const mainMapStyle = {
  'version': 8,
  'name': baseLayer.name,
  'sources': {
    'sourceName': {
      'type': 'raster',
      'tiles': [baseLayer.url],
      'tileSize': 256
    }
  },
  'layers': [{
    'id': 'tiles',
    'type': 'raster',
    'source': 'sourceName',
    'minzoom': 0,
    'maxzoom': 22
  }],
  center: [0, 0],
  zoom: 2
};

const imageryStyles = imagerySearchLayers.map(m => {
  const style = Object.assign({}, mainMapStyle);
  style.name = m.name;
  style.sources = { sourceName: Object.assign(
    {}, mainMapStyle.sources.sourceName, { tiles: [m.url] }
  )};
  style.layers = mainMapStyle.layers.slice(0, mainMapStyle.layers.length + 1);
  return style;
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
  const newStyle = Object.assign({}, templateStyle);
  if (action.type === SET_SEARCH_MAP_CENTER) {
    newStyle.center = [action.center.lng, action.center.lat];
  }
  if (action.type === SET_SEARCH_MAP_ZOOM) {
    newStyle.zoom = action.zoom;
  }
  if (action.type === SET_MAP_LOCATION) {
    newStyle.center = [action.center.lng, action.center.lat];
    newStyle.zoom = action.zoom;
  }

  return newStyle;
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
  const newMainMapStyle = Object.assign({}, state.mainMapStyle);
  const selectedBase = newState.imageryStyles[index];
  newMainMapStyle.name = selectedBase.name;
  newMainMapStyle.sources = { sourceName: Object.assign(
    {}, state.mainMapStyle.sources.sourceName,
      { tiles: selectedBase.sources.sourceName.tiles.slice(0, 1) }
  )};
  newState.mainMapStyle = newMainMapStyle;
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
