import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { diff } from 'mapbox-gl-style-spec';
import Measure from 'react-measure';
import StyleSwitcher from './style-switcher';
import { addMapControls } from '../utils/map';
import { setMapSize } from '../actions/map-actions';
import { setMapBaseLayer } from '../actions';
import { requestPoints, requestsSource } from '../utils/styleManager';
import MapRequestPopover from './map-request-popover';

const HomeMap = React.createClass({
  propTypes: {
    style: PropTypes.object.isRequired,
    className: PropTypes.string,
    baseLayers: PropTypes.array.isRequired,
    baseLayer: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    setMapSize: PropTypes.func.isRequired,
    setMapBaseLayer: PropTypes.func.isRequired,
    newestRequest: PropTypes.string
  },

  componentDidMount: function () {
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: this.props.style
    });

    this.map.on('mousemove', (event) => {
      const features = this.map
        .queryRenderedFeatures(event.point, { layers: [requestPoints] });
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });

    this.map.on('click', (event) => {
      const features = this.map
        .queryRenderedFeatures(event.point, { layers: [requestPoints] });
      if (!features.length) {
        return;
      }

      const feature = features[0];
      this.openPopup(feature);
    });

    let newestFeature;
    if (this.props.newestRequest) {
      newestFeature = this.props.style.sources[requestsSource].data.features
        .find((feature) => {
          return feature.properties._id === this.props.newestRequest;
        });
      if (newestFeature) {
        this.openPopup(newestFeature);
      }
    }

    addMapControls(this.map, ReactDOM.findDOMNode(this));
  },

  openPopup: function (feature) {
    if (typeof feature.properties.tasksInfo === 'string') {
      feature.properties.tasksInfo = JSON.parse(feature.properties.tasksInfo);
    }
    const popoverContent = ReactDOMServer.renderToStaticMarkup(
      <MapRequestPopover data={feature.properties} />
    );
    this.popup = new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML(popoverContent)
    .addTo(this.map);
  },

  componentWillUnmount: function () {
    this.map.remove();
  },

  componentWillReceiveProps: function (nextProps) {
    const changes = diff(this.props.style, nextProps.style);
    const removeTrue = changes.find(change => change.command === 'removeLayer');
    if (removeTrue) {
      this.popup.remove();
    }
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
    baseLayers: state.map.baseLayers,
    newestRequest: state.map.newestRequest
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setMapSize: (size) => dispatch(setMapSize(size)),
    setMapBaseLayer: (layer) => dispatch(setMapBaseLayer(layer))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMap);

