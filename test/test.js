/* global window setTimeout */
/* eslint-disable import/imports-first, no-unused-vars */
import test from 'tape';
import imagerySearchReducerTest from
    './reducers/imagery-search-test';

test('Shutdown', (t) => {
  t.pass('Shutting down');
  t.end();
  setTimeout(() => {
    window.close();
  });
});
