/* eslint no-return-assign: 0 */
'use strict';
import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import Draw from '@mapbox/mapbox-gl-draw';
import Measure from 'react-measure';
import { diff } from 'mapbox-gl-style-spec';
import StyleSwitcher from './style-switcher';
import { addMapControls } from '../utils/map';
// import { mbStyles } from '../utils/mapbox-styles';
import { setMapLocation, setMapSize, setTaskGeoJSON,
  setDrawMode, setSelectedFeatureId } from '../actions/map-actions';
import { setMapBaseLayer } from '../actions';

export const simpleSelect = 'simple_select';
export const directSelect = 'direct_select';
export const drawPolygon = 'draw_polygon';
export const featureId = 'task-feature';

export const EditMap = React.createClass({
  displayName: 'EditMap',

  propTypes: {
    style: T.object.isRequired,
    taskGeojson: T.object,
    drawMode: T.string,
    selectedFeatureId: T.string,
    setMapLocation: T.func.isRequired,
    setMapSize: T.func.isRequired,
    setTaskGeoJSON: T.func.isRequired,
    setDrawMode: T.func.isRequired,
    setSelectedFeatureId: T.func.isRequired,
    mapId: T.string,
    className: T.string,
    baseLayers: T.array.isRequired,
    baseLayer: T.shape({
      id: T.string.isRequired,
      name: T.string.isRequired
    }).isRequired,
    setMapBaseLayer: T.func.isRequired
  },

  componentDidMount: function () {
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: this.props.style
    });
    addMapControls(this.map, ReactDOM.findDOMNode(this));
    this.addDraw();

    this.map.on('moveend', (event) => {
      if (event.originalEvent) {
        const center = this.map.getCenter();
        const zoom = this.map.getZoom();
        const location = { lng: center.lng, lat: center.lat, zoom };
        //this.props.setMapLocation(location);
      }
    });
    this.map.on('load', (event) => {
      this.removeFeature(this.props.taskGeojson, this.props.drawMode);
      if (this.props.taskGeojson) {
        this.addFeature(this.props.taskGeojson,
                            this.props.drawMode, this.props.selectedFeatureId);
      }
    });
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  componentWillReceiveProps: function (nextProps) {
    const changes = diff(this.props.style, nextProps.style);
    changes.forEach(change => {
      this.map[change.command].apply(this.map, change.args);
    });
    this.removeFeature(nextProps.taskGeojson, nextProps.drawMode);
    if (nextProps.taskGeojson) {
      this.addFeature(nextProps.taskGeojson, nextProps.drawMode,
                              nextProps.selectedFeatureId);
    }
    this.activateControls(nextProps);
  },

  addFeature: function (feature, mode, selectedFeatureId) {
    this.draw.add(feature);
    // Initial changeMode is necessary, needs research.
    this.draw.changeMode(simpleSelect);
    if (mode) {
      if (mode === 'direct_select' && selectedFeatureId) {
        this.draw.changeMode(mode, { featureId: selectedFeatureId });
      }
      if (mode === simpleSelect && selectedFeatureId) {
        this.draw.changeMode(mode, { featureIds: [selectedFeatureId] });
      }
      if (mode === simpleSelect && !selectedFeatureId) {
        this.draw.changeMode(mode);
      }
    }
  },

  removeFeature: function (feature, mode) {
    if (!feature) {
      this.draw.deleteAll();
      this.draw.changeMode(mode);
    }
  },

  addDraw: function () {
    this.draw = new Draw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      //styles: mbStyles,
      defaultMode: 'draw_polygon'
    });
    this.map.addControl(this.draw);
    this.map.on('draw.update', (event) => {
      this.props.setTaskGeoJSON(Object.assign({}, event.features[0]));
    });
    this.map.on('draw.modechange', (event) => {
      this.props.setDrawMode(event.mode);
    });
    this.map.on('draw.selectionchange', (event) => {
      if (this.props.drawMode === 'simple_select' && event.features.length === 0 &&
         this.props.selectedFeatureId) {
        this.props.setSelectedFeatureId(undefined);
      }
      if (this.props.drawMode === 'simple_select' && event.features.length > 0 &&
          !this.props.selectedFeatureId) {
        this.props.setSelectedFeatureId(event.features[0].id);
      }
    });
    this.map.on('draw.create', (event) => {
      this.draw.deleteAll();
      this.props.setTaskGeoJSON(
        Object.assign({}, event.features[0], { id: featureId })
      );
    });
    const trashIcon = ReactDOM.findDOMNode(this)
      .querySelector('.mapbox-gl-draw_trash');
    trashIcon.addEventListener('click', () => {
      if (this.props.drawMode === directSelect ||
          this.props.drawMode === simpleSelect) {
        this.props.setTaskGeoJSON(undefined);
      }
    });
  },

  activateControls: function (props) {
    const disabled = 'disabled';
    const active = 'active';
    const trashIconClasses = ReactDOM.findDOMNode(this)
      .querySelector('.mapbox-gl-draw_trash').classList;
    if (props.selectedFeatureId) {
      trashIconClasses.add(active);
      trashIconClasses.remove(disabled);
    } else {
      trashIconClasses.add(disabled);
      trashIconClasses.remove(active);
    }

    const drawIconClasses = ReactDOM.findDOMNode(this)
      .querySelector('.mapbox-gl-draw_polygon').classList;
    if (props.taskGeojson) {
      drawIconClasses.add(disabled);
      drawIconClasses.add(active);
    } else {
      drawIconClasses.add(active);
      drawIconClasses.remove(disabled);
    }
  },

  render: function () {
    return (
      <Measure onResize={(contentRect) => {
        this.props.setMapSize(contentRect.entry);
      }}>
      {({ measureRef }) =>
        <div
          ref={measureRef}
          className={this.props.className}>
          <div
            id={this.props.mapId}
            ref={(mapDiv) => {
              this.mapDiv = mapDiv;
            }}/>
          <div className='map-layers'>
            <StyleSwitcher
              baseLayer={this.props.baseLayer}
              baseLayers={this.props.baseLayers}
              setMapBaseLayer={this.props.setMapBaseLayer}
            />
          </div>
          </div>
      }

      </Measure>
    );
  }
});

function mapStateToProps (state) {
  return {
    taskGeojson: state.map.taskGeojson,
    style: state.map.style,
    drawMode: state.map.drawMode,
    selectedFeatureId: state.map.selectedFeatureId,
    baseLayer: state.map.baseLayer,
    baseLayers: state.map.baseLayers
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setMapLocation: (location) => dispatch(setMapLocation(location)),
    setMapSize: (size) => dispatch(setMapSize(size)),
    setTaskGeoJSON: (taskGeojson) => dispatch(setTaskGeoJSON(taskGeojson)),
    setDrawMode: (drawMode) => dispatch(setDrawMode(drawMode)),
    setSelectedFeatureId: (id) => dispatch(setSelectedFeatureId(id)),
    setMapBaseLayer: (layer) => dispatch(setMapBaseLayer(layer))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditMap);
