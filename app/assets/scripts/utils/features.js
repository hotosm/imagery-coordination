export function geometryToFeature (results) {
  if (results.length === 1) {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': results[0].geometry
      },
      'properties': { }
    };
  }
  return {
    'type': 'FeatureCollection',
    'features':
      results.map((result) => {
        return {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': result.geometry
          },
          'properties': { }
        };
      })
  };
}
