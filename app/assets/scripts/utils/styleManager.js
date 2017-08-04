import mapboxgl from 'mapbox-gl';
import geojsonNormalize from 'geojson-normalize';
import { PerspectiveMercatorViewport } from 'viewport-mercator-project';
import hotStyle from './hotStyle';

const raster = 'raster';
const vector = 'vector';
const rasterLayerId = 'tiles';
const shadowFeaturesLayerId = 'shadow-features';

const templateStyle = {
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
    'id': shadowFeaturesLayerId,
    'type': 'fill',
    'source': 'geojsonSource',
    'layout': {},
    'paint': {
      'fill-color': '#af92d4',
      'fill-opacity': 0.4
    }
  }],
  center: [0, 0],
  zoom: 2
};

const styleManager = {};

styleManager.getInitialStyle = (name, url, type) => {
  if (!name) {
    return hotStyle;
  } else {
    return styleManager.setSource(templateStyle, name, url, type);
  }
};

styleManager.setSource = (prevStyle, name, url, type) => {
  const setVisibility = (layer, visibility) => {
    return Object.assign({}, layer, {
      layout: Object.assign({}, layer.layout, { visibility })
    });
  };
  const newLayers = prevStyle.layers.map((layer) => {
    let newLayer;
    if (type === raster) {
      if (layer.id === rasterLayerId || layer.id === shadowFeaturesLayerId) {
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

export default styleManager;
