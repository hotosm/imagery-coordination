import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { TaskSizeWarning, areaLimit, uavLimit } from
  '../../app/assets/scripts/components/task-size-warning';

test('TaskSizeWarning', t => {
  t.plan(3);
  let wrapper = shallow(<TaskSizeWarning taskArea={0}/>);
  t.notOk(wrapper.find('p').length,
         'Renders empty div when taskArea is below general limit');
  const over = areaLimit + 1;
  wrapper = shallow(<TaskSizeWarning taskArea={over}/>);
  t.equal(wrapper.find('p').length, 1,
          'Renders warning message when taskArea is over general limit');
  const overUav = uavLimit + 1;
  wrapper = shallow(<TaskSizeWarning taskArea={overUav} productType='UAV'/>);
  t.equal(wrapper.find('p').length, 1,
          'Renders warning message when productType is UAV and taskArea ' +
            'is over the UAV limit');
});
