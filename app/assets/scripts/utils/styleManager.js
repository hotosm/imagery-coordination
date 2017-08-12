import mapboxgl from 'mapbox-gl';
import geojsonNormalize from '@mapbox/geojson-normalize';
import { PerspectiveMercatorViewport } from 'viewport-mercator-project';
import hotStyle from './hotStyle';

const raster = 'raster';
const vector = 'vector';
const rasterLayerId = 'tiles';
export const taskPolygons = 'task-polygons';
export const taskPolygonsHighlight = 'task-polygons-highlight';

const rasterTemplateStyle = {
  'version': 8,
  'name': 'rasterTemplate',
  'sources': {
    'rasterSource': {
      'type': 'raster',
      'tiles': ['url'],
      'tileSize': 256
    },
    'geojsonSource': {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [ [ [ ] ] ]
        }
      }
    }
  },
  'layers': [{
    'id': rasterLayerId,
    'type': 'raster',
    'source': 'rasterSource',
    'minzoom': 0,
    'maxzoom': 22,
    'layout': {
      'visibility': 'visible'
    }
  },
  {
    'id': taskPolygons,
    'type': 'fill',
    'source': 'geojsonSource',
    'layout': {},
    'paint': {
      'fill-color': '#af92d4',
      'fill-opacity': 0.4
    }
  },
  {
    id: taskPolygonsHighlight,
    type: 'fill',
    source: 'geojsonSource',
    paint: {
      'fill-opacity': 0.64
    },
    filter: ['==', '_id', '']
  }],
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
    layout: Object.assign({}, layer.layout, { visibility })
  });
};

styleManager.getInitialStyle = (name, url, type) => {
  if (!name) {
    const invisibleRaster = rasterTemplateStyle.layers.map((layer) => {
      let newLayer;
      if (layer.id === rasterLayerId) {
        newLayer = setVisibility(layer, 'none');
      } else {
        newLayer = layer;
      }
      return newLayer;
    });
    const newLayers = hotStyle.layers.concat(invisibleRaster);
    return Object.assign({}, hotStyle, {
      layers: newLayers,
      sources: Object.assign({}, hotStyle.sources, rasterTemplateStyle.sources)
    });
  } else {
    return styleManager.setSource(rasterTemplateStyle, name, url, type);
  }
};

styleManager.setSource = (prevStyle, name, url, type) => {
  const newLayers = prevStyle.layers.map((layer) => {
    let newLayer;
    if (type === raster) {
      if (layer.id === rasterLayerId || layer.id === taskPolygons) {
        newLayer = setVisibility(layer, 'visible');
      } else {
        newLayer = setVisibility(layer, 'none');
      }
    }
    if (type === vector) {
      if (layer.id === rasterLayerId) {
        newLayer = setVisibility(layer, 'none');
      } else {
        newLayer = setVisibility(layer, 'visible');
      }
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
      feature.geometry.coordinates[0].forEach((coordinate) => {
        coordinates.push(coordinate);
      });
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

styleManager.setGeoJSONData = (geojson, templateStyle) => {
  const style = Object.assign({}, templateStyle, {
    sources: Object.assign({}, templateStyle.sources, {
      geojsonSource: Object.assign({}, templateStyle.sources.geojsonSource, {
        data: geojson
      })
    })
  });
  return style;
};

styleManager.getSourceZoomedStyle = (size, templateStyle) => {
  let style;
  const data = templateStyle.sources.geojsonSource.data;
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

export default styleManager;
