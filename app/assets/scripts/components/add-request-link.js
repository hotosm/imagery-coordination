import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { isLoggedIn } from '../utils/auth-service';

export const AddRequestLink = (props) => {
  if (props.coordinator && props.createRequestEnabled) {
    return <Link to='/requests/edit' className='button-add-request'>Complete request</Link>;
  } else {
    return <div></div>;
  }
};

AddRequestLink.propTypes = {
  coordinator: T.bool.isRequired,
  createRequestEnabled: T.bool.isRequired
};

export function isCoordinator (token, user) {
  const roles = _.get(user, 'profile.roles', []);
  return (isLoggedIn(token) && roles.indexOf('coordinator') !== -1);
}

const mapStateToProps = state => ({
  coordinator: isCoordinator(state.user.token, state.user),
  createRequestEnabled: state.imagerySearch.createRequestEnabled
});

export default connect(mapStateToProps, null)(AddRequestLink);

