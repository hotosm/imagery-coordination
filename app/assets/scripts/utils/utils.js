'use strict';
import moment from 'moment';
import GJV from 'geojson-validation';

export function dateFromRelative (reltiveAgo) {
  switch (reltiveAgo) {
    case 'week' :
      return moment().subtract(7, 'days').startOf('day').toISOString();
    case 'month' :
      return moment().subtract(1, 'month').startOf('day').toISOString();
    case 'months3' :
      return moment().subtract(3, 'month').startOf('day').toISOString();
    case 'months6' :
      return moment().subtract(6, 'month').startOf('day').toISOString();
    case 'year' :
      return moment().subtract(1, 'year').startOf('day').toISOString();
    default:
      return null;
  }
}

export function validateGeoJSONPolygon (geojson, cb) {
  let isFc = true;
  let isF = true;

  GJV.isFeatureCollection(geojson, (valid, errs) => {
    if (!valid) isFc = false;
    console.log('erros', errs);

    GJV.isFeature(geojson, (valid, errs) => {
      if (!valid) isF = false;
      console.log('erros', errs);

      if (!isFc && !isF) {
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
