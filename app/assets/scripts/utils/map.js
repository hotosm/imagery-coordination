'use strict';
import mapboxgl from 'mapbox-gl';

export function setupMap (container, layerURL) {
  var map = new mapboxgl.Map({
    container: container,
    style: {
      'version': 8,
      'sources': {
        'raster-tiles': {
          'type': 'raster',
          'tiles': [layerURL],
          'tileSize': 256
        }
      },
      'layers': [{
        'id': 'simple-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 0,
        'maxzoom': 22
      }]
    },
    center: [0, 20],
    zoom: 1
  });
  addMapControls(map);

  return map;
}

export function addMapControls (map, domNode) {
  map.addControl(new mapboxgl.NavigationControl(), 'top-left');
  // disable map rotation using right click + drag
  map.dragRotate.disable();
  // disable map rotation using touch rotation gesture
  map.touchZoomRotate.disableRotation();
  // Disable scroll zoom
  map.scrollZoom.disable();

  // Hack the controls to match the style.
  let controls;
  const query = '.mapboxgl-ctrl-top-left .mapboxgl-ctrl-group';
  if (domNode) {
    controls = domNode.querySelector(query);
  } else {
    controls = document.querySelector(query);
  }
  controls.classList.add('button-group', 'button-group--vertical');
  controls.querySelector('.mapboxgl-ctrl-zoom-in').classList.add('button');
  controls.querySelector('.mapboxgl-ctrl-zoom-out').classList.add('button');
  controls.querySelector('.mapboxgl-ctrl-compass').remove();
}
