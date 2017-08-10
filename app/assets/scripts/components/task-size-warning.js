import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import area from '@turf/area';

export const areaLimit = 1E9;
export const uavLimit = 1E6;
const uavProductType = 'UAV';

const getTaskGeojson = (state) => state.map.taskGeojson;
const getTaskArea = createSelector(
  [getTaskGeojson],
  (taskGeojson) => {
    let taskArea = 0;
    if (taskGeojson) {
      taskArea = area(taskGeojson);
    }
    return taskArea;
  });

export const TaskSizeWarning = (props) => {
  const limit = props.productType === uavProductType ? uavLimit : areaLimit;
  if (props.taskArea > limit) {
    return (
      <div className="alert alert--warning" role="alert">
        <p><strong>Warning </strong>
          {'The task feature is larger than ' + limit / 1000000 + ' sq/KM'}</p>
      </div>
    );
  } else {
    return <div/>;
  }
};

TaskSizeWarning.propTypes = {
  taskArea: PropTypes.number.isRequired,
  productType: PropTypes.string
};

const getTaskProductType = (state) => {
  let productType;
  if (state.task.data && state.task.data.requestInfo) {
    productType = state.task.data.requestInfo.productType;
  }
  return productType;
};

const mapStateToProps = (state) => {
  return {
    taskArea: getTaskArea(state),
    productType: getTaskProductType(state)
  };
};
export default connect(mapStateToProps)(TaskSizeWarning);
