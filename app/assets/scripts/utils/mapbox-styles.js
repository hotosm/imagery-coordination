export const mbStyles = [
  // Active line stroke (first line, before polygon is closed)
  {
    'id': 'gl-draw-line',
    'type': 'line',
    'filter': ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ff33cc',
      'line-dasharray': [0.2, 2],
      'line-width': 2
    }
  },
  // Active polygon fill
  {
    'id': 'gl-draw-polygon-fill',
    'type': 'fill',
    'filter': ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    'paint': {
      'fill-color': '#ff33cc',
      'fill-outline-color': '#ff33cc',
      'fill-opacity': 0.2
    }
  },
  // Active polygon outline stroke (after the polygon can close)
  {
    'id': 'gl-draw-polygon-stroke-active',
    'type': 'line',
    'filter': ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#ff33cc',
      'line-dasharray': [0.2, 2],
      'line-width': 2
    }
  },
  // Active vertex point halos
  {
    'id': 'gl-draw-polygon-and-line-vertex-halo-active',
    'type': 'circle',
    'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    'paint': {
      'circle-radius': 7,
      'circle-color': '#000'
    }
  },
  // Active vertex points
  {
    'id': 'gl-draw-polygon-and-line-vertex-active',
    'type': 'circle',
    'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    'paint': {
      'circle-radius': 5,
      'circle-color': '#fff'
    }
  },
  // Inactive line stroke
  {
    'id': 'gl-draw-line-static',
    'type': 'line',
    'filter': ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'static']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#000',
      'line-width': 3
    }
  },
  // Inactive polygon fill
  {
    'id': 'gl-draw-polygon-fill-static',
    'type': 'fill',
    'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'active', 'false']],
    'paint': {
      'fill-color': '#51d6ff',
      'fill-outline-color': '#0fc7ff',
      'fill-opacity': 0.2
    }
  },

  // Inactive polygon outline
  {
    'id': 'gl-draw-polygon-stroke-static',
    'type': 'line',
    'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'active', 'false']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#0fc7ff',
      'line-width': 3
    }
  }
];
