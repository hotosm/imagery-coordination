import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import mapboxgl from 'mapbox-gl';
import { diff } from 'mapbox-gl-style-spec';
import styleManager from '../utils/styleManager';

const getStyle = (state) => {
  return state.map.style;
};

const getTaskId = (state, props) => {
  return props.taskId;
};

export const makeGetTaskZoomStyle = () => {
  return createSelector([getStyle, getTaskId], (style, taskId) => {
    const geojsonSource = style.sources.geojsonSource;
    if (geojsonSource.data && geojsonSource.data.features.length) {
      const feature = geojsonSource.data.features
      .find((feature) => {
        return feature.properties._id === taskId;
      });
      const size = { height: 300, width: 200 };
      const zoomedStyle = styleManager.getZoomedStyle(feature, size, style);
      const filteredStyle = styleManager.getFilteredTasksStyle(taskId, zoomedStyle);
      return filteredStyle;
    } else {
      return style;
    }
  });
};

const TaskCardMap = React.createClass({
  propTypes: {
    taskId: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired
  },

  componentDidMount: function () {
    this.map = new mapboxgl.Map({
      container: this.refs.map,
      style: this.props.style,
      interactive: false,
      attributionControl: false
    });
  },

  componentWillReceiveProps: function (nextProps) {
    const changes = diff(this.props.style, nextProps.style);
    changes.forEach(change => {
      this.map[change.command].apply(this.map, change.args);
    });
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  render: function () {
    return (
      <div className={this.props.className} ref='map'/>
    );
  }
});

const makeMapStateToProps = () => {
  const getTaskZoomStyle = makeGetTaskZoomStyle();
  const mapStateToProps = (state, props) => {
    return {
      taskId: props.taskId,
      style: getTaskZoomStyle(state, props)
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TaskCardMap);

