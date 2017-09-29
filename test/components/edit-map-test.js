import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { EditMap } from '../../app/assets/scripts/components/edit-map';
import { drawPolygon } from '../../app/assets/scripts/utils/constants';
import hotStyle from '../../app/assets/scripts/utils/hotStyle';
import config from '../../app/assets/scripts/config';
import mapboxgl from 'mapbox-gl';

const setup = () => {
  mapboxgl.accessToken = config.mbToken;
  const style = hotStyle;
  const taskGeojson = undefined;
  const drawMode = drawPolygon;
  const selectedFeatureId = undefined;
  const setMapLocation = sinon.spy();
  const setMapSize = sinon.spy();
  const setTaskGeoJSON = sinon.spy();
  const setDrawMode = sinon.spy();
  const setSelectedFeatureId = sinon.spy();
  const baseLayers = [];
  const baseLayer = { id: 'testid', name: 'test' };
  const setMapBaseLayer = sinon.spy();
  const props = {
    style,
    taskGeojson,
    drawMode,
    selectedFeatureId,
    setMapLocation,
    setMapSize,
    setTaskGeoJSON,
    setDrawMode,
    setSelectedFeatureId,
    baseLayers,
    baseLayer,
    setMapBaseLayer
  };
  const wrapper = mount(<EditMap {...props}/>);
  return { wrapper, props };
};

test('EditMap clears existing draw features with null taskGeojson prop', t => {
  t.plan(2);
  const wrapper = setup().wrapper;
  const map = wrapper.instance().map;
  const draw = wrapper.instance().draw;
  const loaded = sinon.stub(map, 'loaded');
  loaded.returns(true);
  const deleteAll = sinon.spy(draw, 'deleteAll');
  const changeMode = sinon.spy(draw, 'changeMode');

  wrapper.setProps({ taskGeojson: undefined, drawMode: drawPolygon });
  t.ok(deleteAll.called);
  t.equal(changeMode.getCall(0).args[0], drawPolygon);
});

test('EditMap draw.update setsTaskGeoJSON with correct features', t => {
  t.plan(1);
  const { wrapper, props } = setup();
  const map = wrapper.instance().map;
  const feature = { geometry: 1 };
  map.fire('draw.update', { features: [feature] });
  t.deepEqual(props.setTaskGeoJSON.getCall(0).args[0], feature);
});

