function moveToMapPosition (master, slaves) {
  let center = master.getCenter();
  let zoom = master.getZoom();
  let bearing = master.getBearing();
  let pitch = master.getPitch();

  slaves.forEach(slave => {
    slave.jumpTo({
      center,
      zoom,
      bearing,
      pitch
    });
  });
}

// Sync movements of two maps.
//
// All interactions that result in movement end up firing
// a "move" event. The trick here, though, is to
// ensure that movements don't cycle from one map
// to the other and back again, because such a cycle
// - could cause an infinite loop
// - prematurely halts prolonged movements like
//   double-click zooming, box-zooming, and flying
function syncMaps (maps) {
  // Create all the movement functions, because if they're created every time
  // they wouldn't be the same and couldn't be removed.
  var fns = [];
  maps.forEach((map, index) => {
    let fn = sync.bind(null, map, maps.filter((o, i) => i !== index));
    fns[index] = fn;
  });

  function on () {
    maps.forEach((map, index) => {
      map.on('move', fns[index]);
    });
  }

  function off () {
    maps.forEach((map, index) => {
      map.off('move', fns[index]);
    });
  }

  // When one map moves, we turn off the movement listeners
  // on all the maps, move it, then turn the listeners on again
  function sync (master, slaves) {
    off();
    moveToMapPosition(master, slaves);
    on();
  }

  on();
}

module.exports = syncMaps;
