import test from 'tape';
import sinon from 'sinon';
import { makeGetTaskZoomStyle }
  from '../../app/assets/scripts/components/task-card-map';
import styleManager from '../../app/assets/scripts/utils/styleManager';

test('TaskCardMap', t => {
  const zoomedStyle = 'zoomedStyle';
  const getZoomedStyle = sinon.stub(styleManager, 'getZoomedStyle')
    .returns(zoomedStyle);
  const filteredStyle = 'filteredStyle';
  const getFilteredTasksStyle = sinon.stub(styleManager, 'getFilteredTasksStyle')
    .returns(filteredStyle);

  const taskId = '1';
  const noFeatures = {
    features: []
  };
  const features = {
    features: [{
      properties: {
        _id: taskId
      }
    }]
  };

  const getTaskZoomStyle = makeGetTaskZoomStyle();
  const stateNoFeatures = {
    map: {
      style: {
        sources: {
          geojsonSource: {
            data: noFeatures
          }
        }
      }
    }
  };

  const stateFeatures = {
    map: {
      style: {
        sources: {
          geojsonSource: {
            data: features
          }
        }
      }
    }
  };

  const props = {
    taskId
  };

  let style = getTaskZoomStyle(stateNoFeatures, props);
  t.deepEqual(style, stateNoFeatures.map.style);

  style = getTaskZoomStyle(stateFeatures, props);
  t.ok(getZoomedStyle.called);
  t.ok(getFilteredTasksStyle.called);
  t.equal(style, filteredStyle);
  t.end();

  getZoomedStyle.restore();
  getFilteredTasksStyle.restore();
});
