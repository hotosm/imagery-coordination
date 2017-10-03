import mapboxgl from 'mapbox-gl';
import geojsonNormalize from '@mapbox/geojson-normalize';
import { PerspectiveMercatorViewport } from 'viewport-mercator-project';
import hotStyle from './hotStyle';

const raster = 'raster';
const vector = 'vector';
const visible = 'visible';
const none = 'none';

const rasterLayerId = 'tiles';
export const taskPolygons = 'task-polygons';
export const requestPoints = 'request-points';
export const requestPointLabels = 'request-point-labels';
export const taskPolygonsHighlight = 'task-polygons-highlight';
export const geojsonSource = 'geojsonSource';
export const requestsSource = 'requestsSource';

export const requestStatusStyles = [
  {name: 'open', color: '#5ABDCB'},
  {name: 'closed', color: '#A5B1B5'},
  {name: 'canceled', color: '#EA4F54'}
];

const rasterTemplateStyle = {
  version: 8,
  name: 'rasterTemplate',
  sources: {
    rasterSource: {
      type: 'raster',
      tiles: ['url'],
      tileSize: 256
    },
    [geojsonSource]: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [ [ [ ] ] ]
        }
      }
    },
    [requestsSource]: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [ [ [ ] ] ]
        }
      }
    }
  },
  layers: [{
    id: rasterLayerId,
    type: 'raster',
    source: 'rasterSource',
    minzoom: 0,
    maxzoom: 22,
    layout: {
      visibility: 'none'
    }
  },
  {
    id: taskPolygons,
    type: 'fill',
    source: geojsonSource,
    layout: {
      visibility: 'visible'
    },
    paint: {
      'fill-color': '#af92d4',
      'fill-opacity': 0.4
    }
  },
  {
    id: taskPolygonsHighlight,
    type: 'fill',
    source: geojsonSource,
    layout: {
      visibility: 'visible'
    },
    paint: {
      'fill-opacity': 0.64
    },
    filter: ['==', '_id', '']
  },
  {
    id: requestPoints,
    type: 'circle',
    source: requestsSource,
    layout: {
      visibility: 'visible'
    },
    paint: {
      'circle-color': {
        property: 'status',
        type: 'categorical',
        stops: requestStatusStyles.map(style => [style.name, style.color])
      },
      'circle-radius': 10
    }
  },
  {
    id: requestPointLabels,
    type: 'symbol',
    source: requestsSource,
    layout: {
      visibility: 'visible',
      'text-field': '',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-anchor': 'center'
    }
  }
  ],
  center: [0, 0],
  zoom: 2
};

export const taskStatusStyles = [
  {name: 'open', color: '#5ABDCB'},
  {name: 'inprogress', color: '#D0EC77'},
  {name: 'completed', color: '#72C97D'}
];

const styleManager = {};

const setVisibility = (layer, visibility) => {
  return Object.assign({}, layer, {
    layout: Object.assign({}, layer.layout, { visibility: visibility })
  });
};

styleManager.getInitialStyle = (name, url, type) => {
  const mergedStyle = Object.assign({}, hotStyle, {
    layers: hotStyle.layers.concat(rasterTemplateStyle.layers),
    sources: Object.assign({}, hotStyle.sources, rasterTemplateStyle.sources)
  });
  if (!name) {
    return mergedStyle;
  } else {
    return styleManager.setSource(mergedStyle, name, url, type);
  }
};

styleManager.setSource = (prevStyle, name, url, type) => {
  let rasterVisibility = visible;
  let vectorVisibility = visible;
  if (type === raster) {
    rasterVisibility = visible;
    vectorVisibility = none;
  }
  if (type === vector) {
    rasterVisibility = none;
    vectorVisibility = visible;
  }

  const newLayers = prevStyle.layers.map((layer) => {
    const isTemplateLayer = rasterTemplateStyle.layers.find(templateLayer => {
      return templateLayer.id === layer.id;
    });

    let newLayer;
    if (isTemplateLayer) {
      if (layer.id === rasterLayerId) {
        newLayer = setVisibility(layer, rasterVisibility);
      } else {
        newLayer = setVisibility(layer, layer.layout.visibility);
      }
    } else {
      newLayer = setVisibility(layer, vectorVisibility);
    }
    return newLayer;
  });

  const style = Object.assign({}, prevStyle, {
    sources: Object.assign({}, prevStyle.sources, {
      rasterSource: Object.assign({}, prevStyle.sources.rasterSource, {
        tiles: [url]
      })
    }),
    layers: newLayers,
    name
  });
  return style;
};

styleManager.setZoom = (prevStyle, zoom) => {
  const style = Object.assign({}, prevStyle);
  style.zoom = zoom;
  return style;
};

styleManager.setCenter = (prevStyle, center) => {
  const style = Object.assign({}, prevStyle);
  style.center = [center.lng, center.lat];
  return style;
};

styleManager.getZoomedStyle = (geojson, size, templateStyle) => {
  const featureCollection = geojsonNormalize(geojson);
  // Handle zooming to multiple features for shadow features.
  const coordinates = featureCollection.features
    .reduce((coordinates, feature) => {
      if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates[0].forEach((coordinate) => {
          coordinates.push(coordinate);
        });
      }
      if (feature.geometry.type === 'Point') {
        coordinates.push(feature.geometry.coordinates);
      }
      return coordinates;
    }, []);

  const viewport = new PerspectiveMercatorViewport({
    longitude: templateStyle.center[0],
    latitude: templateStyle.center[1],
    zoom: templateStyle.zoom,
    width: size.width,
    height: size.height
  });

  let bounds = coordinates.reduce((bounds, coord) => {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  const zoomedViewport =
    viewport.fitBounds([[sw.lng, sw.lat], [ne.lng, ne.lat]], { padding: 30 });

  const style = Object.assign({}, templateStyle, {
    zoom: zoomedViewport.zoom,
    center: [zoomedViewport.longitude, zoomedViewport.latitude]
  });
  return style;
};

styleManager.setGeoJSONData = (geojson, templateStyle, source) => {
  const featureCollection = geojsonNormalize(geojson);
  const style = Object.assign({}, templateStyle, {
    sources: Object.assign({}, templateStyle.sources, {
      [source]: Object.assign({}, templateStyle.sources.geojsonSource, {
        data: featureCollection
      })
    })
  });
  return style;
};

styleManager.getSourceZoomedStyle = (size, source, templateStyle) => {
  let style;
  const data = templateStyle.sources[source].data;
  if (data.features && data.features.length !== 0) {
    style = styleManager.getZoomedStyle(data, size, templateStyle);
  } else {
    style = templateStyle;
  }
  return style;
};

styleManager.getFilteredTaskIdStyle = (taskId, templateStyle) => {
  const newLayers = templateStyle.layers.map((layer) => {
    let newLayer;
    if (layer.id === taskPolygons) {
      newLayer = Object.assign({}, layer, {
        filter: ['!=', '_id', taskId]
      });
    } else {
      newLayer = layer;
    }
    return newLayer;
  });
  return Object.assign({}, templateStyle, { layers: newLayers });
};

styleManager.getFilteredTasksStyle = (taskId, templateStyle) => {
  const newLayers = templateStyle.layers.map((layer) => {
    let newLayer;
    if (layer.id === taskPolygons) {
      newLayer = Object.assign({}, layer, {
        filter: ['==', '_id', taskId]
      });
    } else {
      newLayer = layer;
    }
    return newLayer;
  });
  return Object.assign({}, templateStyle, { layers: newLayers });
};

styleManager.getTaskStatusStyle = (templateStyle) => {
  const style = Object.assign({}, templateStyle, {
    layers: templateStyle.layers.map((layer) => {
      if (layer.id === taskPolygons) {
        return Object.assign({}, layer, {
          paint: {
            'fill-color': {
              property: 'status',
              type: 'categorical',
              stops: taskStatusStyles.map(s => [s.name, s.color])
            },
            'fill-opacity': 0.64
          },
          filter: ['has', '_id']
        });
      } else {
        return layer;
      }
    })
  });
  return style;
};

styleManager.getRequestStatusOffStyle = (templateStyle) => {
  const style = Object.assign({}, templateStyle, {
    layers: templateStyle.layers.map((layer) => {
      let newLayer;
      if (layer.id === requestPoints || layer.id === requestPointLabels) {
        newLayer = setVisibility(layer, none);
      } else if (layer.id === taskPolygons) {
        newLayer = setVisibility(layer, visible);
      } else {
        newLayer = layer;
      }
      // Hack to handle Mapbox worker issue
      if (layer.id === requestPointLabels) {
        newLayer.layout['text-field'] = '';
      }
      return newLayer;
    })
  });
  return style;
};

styleManager.getRequestStatusStyle = (templateStyle) => {
  const style = Object.assign({}, templateStyle, {
    layers: templateStyle.layers.map((layer) => {
      let newLayer;
      if (layer.id === requestPoints || layer.id === requestPointLabels) {
        newLayer = setVisibility(layer, visible);
      } else if (layer.id === taskPolygons) {
        newLayer = setVisibility(layer, none);
      } else {
        newLayer = layer;
      }
      // Hack to handle Mapbox worker issue
      if (layer.id === requestPointLabels) {
        newLayer.layout['text-field'] = '{completed}';
      }
      return newLayer;
    })
  });
  return style;
};

export default styleManager;
