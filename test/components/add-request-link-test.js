import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import { AddRequestLink, isCoordinator, __RewireAPI__ as RewireAddLink } from
  '../../app/assets/scripts/components/add-request-link';

test('isCoordinator is true when user is logged in and is a coordinator', t => {
  RewireAddLink.__Rewire__('isLoggedIn', () => true);
  t.plan(1);
  const user = {
    profile: { roles: ['coordinator'] }
  };
  const coordinator = isCoordinator(1, user);
  t.ok(coordinator);
  RewireAddLink.__ResetDependency__('isLoggedIn');
});

test('isCoordinator is false when user is not logged in', t => {
  t.plan(1);
  RewireAddLink.__Rewire__('isLoggedIn', () => false);
  const user = {
    profile: { roles: ['coordinator'] }
  };
  const coordinator = isCoordinator(1, user);
  t.notOk(coordinator);
  RewireAddLink.__ResetDependency__('isLoggedIn');
});

test('isCoordinator is false when user is not a coordinator', t => {
  t.plan(1);
  RewireAddLink.__Rewire__('isLoggedIn', () => true);
  const user = {
    profile: { roles: [''] }
  };
  const coordinator = isCoordinator(1, user);
  t.notOk(coordinator);
  RewireAddLink.__ResetDependency__('isLoggedIn');
});

test('Returns empty div when createRequestEnabled is false', t => {
  RewireAddLink.__Rewire__('isLoggedIn', () => true);
  t.plan(1);
  const wrapper = shallow(<AddRequestLink coordinator={true}
                            createRequestEnabled={false} />);
  t.equal(wrapper.find(Link).length, 0);
  RewireAddLink.__ResetDependency__('isLoggedIn');
});

test('Returns Link when createRequestEnabled is true', t => {
  RewireAddLink.__Rewire__('isLoggedIn', () => true);
  t.plan(1);
  const wrapper = shallow(<AddRequestLink coordinator={true}
                            createRequestEnabled={true} />);
  t.equal(wrapper.find(Link).length, 1);
  RewireAddLink.__ResetDependency__('isLoggedIn');
});
