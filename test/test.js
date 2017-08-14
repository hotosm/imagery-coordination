/* global window setTimeout */
/* eslint-disable import/imports-first, no-unused-vars */
import test from 'tape';
import imagerySearchReducerTest from './reducers/imagery-search-test';
import addRequestLinkTest from './components/add-request-link-test';
import editMapTest from './components/edit-map-test';
import mapReducerTest from './reducers/map-reducer-test';
import taskSizeWarningTest from './components/task-size-warning-test';
import taskCardMapTest from './components/task-card-map-test';

test('Shutdown', (t) => {
  t.pass('Shutting down');
  t.end();
  setTimeout(() => {
    window.close();
  });
});
