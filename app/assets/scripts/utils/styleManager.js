// import geojsonExtent from '@mapbox/geojson-extent';
 //import geoViewPort from '@mapbox/geo-viewport';
import mapboxgl from 'mapbox-gl';
import { PerspectiveMercatorViewport } from 'viewport-mercator-project';
import hotStyle from './hotStyle';

const templateStyle = {
  'version': 8,
  'name': 'name',
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
    'id': 'tiles',
    'type': 'raster',
    'source': 'rasterSource',
    'minzoom': 0,
    'maxzoom': 22
  },
  {
    'id': 'shadow-features',
    'type': 'fill',
    'source': 'geojsonSource',
    'layout': {},
    'paint': {
      'fill-color': '#000',
      'fill-opacity': 0.16
    }
  }],
  center: [0, 0],
  zoom: 2
};

const styleManager = {};

styleManager.getInitialStyle = (name, url) => {
  if (!name) {
    return hotStyle;
  } else {
    return styleManager.setSource(templateStyle, name, url);
  }
};

styleManager.setSource = (prevStyle, name, url) => {
  const style = Object.assign({}, prevStyle, {
    sources: Object.assign({}, prevStyle.sources, {
      rasterSource: Object.assign({}, prevStyle.sources.rasterSource, {
        tiles: [url]
      })
    }),
    //layers: prevStyle.layers.slice(0, prevStyle.layers.length + 1),
    //center: prevStyle.center.slice(0, 2),
    name
  });
  return style;
};

const cloneStyle = (prevStyle) => {
  //const style = Object.assign({}, prevStyle, {
    //sources: Object.assign({}, prevStyle.sources, {
      //rasterSource: Object.assign({}, prevStyle.sources.rasterSource, {
        //tiles: [prevStyle.sources.rasterSource.tiles[0]]
      //})
    //}),
    //layers: prevStyle.layers.slice(0, prevStyle.layers.length + 1),
    //center: prevStyle.center.slice(0, 2)
  //});
  //return style;
  return Object.assign({}, prevStyle);
};

styleManager.setZoom = (prevStyle, zoom) => {
  const style = cloneStyle(prevStyle);
  style.zoom = zoom;
  return style;
};

styleManager.setCenter = (prevStyle, center) => {
  const style = cloneStyle(prevStyle);
  style.center = [center.lng, center.lat];
  return style;
};

//styleManager.getZoomedStyle = (geojson, size, templateStyle) => {
  //const extent = geojsonExtent(geojson);
  //const width = size.width;
  //const height = size.height;
  //const viewport = geoViewPort.viewport(extent, [width, height]);
  //const style = styleManager.setZoom(
    //styleManager.setCenter(templateStyle,
                           //{ lng: viewport.center[0], lat: viewport.center[1] }),
                           //viewport.zoom);
  //return style;
//};

styleManager.getZoomedStyle = (coordinates, size, templateStyle) => {
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
