import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { simpleSelect, directSelect, drawPolygon, featureId }
  from './edit-map';
import { setTaskGeoJSON } from '../actions/map-actions';

function getClassMessage (drawMode, selectedFeatureId) {
  let classMessage;
  if (drawMode === directSelect && selectedFeatureId === featureId) {
    classMessage = {
      className: 'edit-status-direct-select',
      message: 'Click and drag the shape vertices to move them'
    };
  }
  if (drawMode === simpleSelect && selectedFeatureId === featureId) {
    classMessage = {
      className: 'edit-status-simple-select',
      message: 'Click and drag on the shape to move it'
    };
  }
  if (drawMode === simpleSelect && !selectedFeatureId) {
    classMessage = {
      className: 'edit-status-simple-select-none',
      message: 'Click the blue shape to re-select it for editing'
    };
  }
  if (drawMode === drawPolygon) {
    classMessage = {
      className: 'edit-status-draw-polygon',
      message: 'Click points on the map for a new shape. Double click to finish'
    };
  }
  return classMessage;
}

const EditStatus = (props) => {
  const classMessage = getClassMessage(props.drawMode, props.selectedFeatureId);
  const deleteButtonStatus = classNames({
    'edit-status-delete-drawing': true,
    disabled: !props.taskGeojson || !props.selectedFeatureId
  });
  return (
    <div>
    <span className={classMessage.className}>{classMessage.message}</span>
    <button
      className={deleteButtonStatus}
      onClick={() => { props.setTaskGeoJSON(undefined); }}>Delete Drawing</button>
    </div>
  );
};

EditStatus.propTypes = {
  drawMode: T.string.isRequired,
  selectedFeatureId: T.string,
  taskGeojson: T.object,
  setTaskGeoJSON: T.func.isRequired
};

function mapStateToProps (state) {
  return {
    drawMode: state.map.drawMode,
    selectedFeatureId: state.map.selectedFeatureId,
    taskGeojson: state.map.taskGeojson
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setTaskGeoJSON: (geojson) => dispatch(setTaskGeoJSON(geojson))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStatus);
