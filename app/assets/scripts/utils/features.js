import GJV from 'geojson-validation';

function noop () {
  return {};
}

export function geometryToFeature (results, propMapper = noop) {
  if (results.length > 1) {
    if (results[0].geometry) {
      return {
        'type': 'FeatureCollection',
        'features':
          results.map((result) => {
            return {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [result.geometry]
              },
              'properties': propMapper(result)
            };
          })
      };
    }
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [results]
      },
      'properties': { }
    };
  } else if (results.length) {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [results[0].geometry]
      },
      'properties': propMapper(results[0])
    };
  }
}

export function combineFeatureResults (results, propMapper = noop) {
  results = results.filter((result) => {
    return result.footprint != null;
  });
  return ({
    'type': 'FeatureCollection',
    'features':
      results.map((result) => {
        return {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': result.footprint.geometry.coordinates
          },
          'properties': propMapper(result)
        };
      })
  });
}

export function validateGeoJSONPolygon (geojson, cb) {
  let isFc = true;
  let isF = true;

  GJV.isFeatureCollection(geojson, (valid, errs) => {
    if (!valid) isFc = false;

    GJV.isFeature(geojson, (valid, errs) => {
      if (!valid) isF = false;

      if (!isFc && !isF) {
        console.log('errors', errs);
        return cb('Invalid format, provide a Feature or Feature Collection');
      }

      if (isFc && geojson.features.length > 1) {
        return cb('Feature Collection should only have 1 feature');
      }

      let feature = isFc ? geojson.features[0] : geojson;

      if (!feature.geometry) {
        return cb('Invalid feature provided');
      }

      GJV.isPolygon(feature.geometry, (valid, errs) => {
        if (!valid) {
          return cb('Please provide a feature with a valid polygon');
        } else {
          return cb(null, feature.geometry.coordinates[0]);
        }
      });
    });
  });
}
