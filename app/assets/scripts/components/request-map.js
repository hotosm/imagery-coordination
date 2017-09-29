import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { diff } from 'mapbox-gl-style-spec';
import Measure from 'react-measure';
import center from '@turf/center';
import StyleSwitcher from './style-switcher';
import MapTaskPopover from './map-task-popover';
import { addMapControls } from '../utils/map';
import { setMapSize } from '../actions/map-actions';
import { setMapBaseLayer } from '../actions';
import { taskPolygons, taskPolygonsHighlight, taskStatusStyles }
  from '../utils/styleManager';

export const RequestMap = React.createClass({
  propTypes: {
    style: PropTypes.object.isRequired,
    className: PropTypes.string,
    baseLayers: PropTypes.array.isRequired,
    baseLayer: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    setMapSize: PropTypes.func.isRequired,
    setMapBaseLayer: PropTypes.func.isRequired
  },

  componentDidMount: function () {
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: this.props.style
    });
    this.map.on('mousemove', (event) => {
      if (!this.map.getLayer(taskPolygons)) {
        return;
      }
      const features = this.map
        .queryRenderedFeatures(event.point, { layers: [taskPolygons] });
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      if (features.length) {
        const feature = features[0];
        this.map.setFilter(taskPolygonsHighlight,
                           ['==', '_id', feature.properties._id]);
        const status = taskStatusStyles.find((style) => {
          return style.name === feature.properties.status;
        });
        this.map.setPaintProperty(taskPolygonsHighlight,
                                  'fill-color', status.color);
      } else {
        this.map.setFilter(taskPolygonsHighlight, ['==', '_id', '']);
      }
    });

    this.map.on('click', (event) => {
      const features = this.map
        .queryRenderedFeatures(event.point, { layers: [taskPolygons] });
      if (!features.length) {
        return;
      }

      const feature = features[0];
      const popoverContent = ReactDOMServer.renderToStaticMarkup(
        <MapTaskPopover data={feature.properties} />
      );
      new mapboxgl.Popup()
        .setLngLat(center(feature).geometry.coordinates)
        .setHTML(popoverContent)
        .addTo(this.map);
    });
    addMapControls(this.map, ReactDOM.findDOMNode(this));
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  componentWillReceiveProps: function (nextProps) {
    const changes = diff(this.props.style, nextProps.style);
    changes.forEach(change => {
      this.map[change.command].apply(this.map, change.args);
    });
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
    style: state.map.style,
    baseLayer: state.map.baseLayer,
    baseLayers: state.map.baseLayers
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setMapSize: (size) => dispatch(setMapSize(size)),
    setMapBaseLayer: (layer) => dispatch(setMapBaseLayer(layer))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestMap);

