'use strict';
import moment from 'moment';

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
