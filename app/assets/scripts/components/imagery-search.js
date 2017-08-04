import React, { PropTypes as T } from 'react';
import mapboxgl from 'mapbox-gl';
import { diff } from 'mapbox-gl-style-spec';
import AddRequestLink from './add-request-link';
import { addMapControls } from '../utils/map';

const ImagerySearch = React.createClass({
  propTypes: {
    mainMapStyle: T.shape({
      version: T.number.isRequired,
      name: T.string.isRequired,
      sources: T.object.isRequired,
      layers: T.array.isRequired,
      center: T.array.isRequired,
      zoom: T.number.isRequired
    }).isRequired,
    imageryStyles: T.array.isRequired,
    selectedBase: T.number,
    router: T.shape({
      push: T.func.isRequired
    }).isRequired,
    params: T.object.isRequired,
    _setSearchMapCenter: T.func.isRequired,
    _setSearchMapZoom: T.func.isRequired,
    _setSearchMapBaselayer: T.func.isRequired,
    setMapLocation: T.func.isRequired
  },

  componentDidMount: function () {
    this.mainMap = new mapboxgl.Map({
      container: this.refs.mainMap,
      style: this.props.mainMapStyle
    });
    addMapControls(this.mainMap);
    this.maps = this.props.imageryStyles.map((imagerySearchStyle, i) => {
      const map = new mapboxgl.Map({
        container: this.refs[`mapThumb${i}`],
        style: imagerySearchStyle,
        interactive: false,
        attributionControl: false
      });
      return map;
    });

    this.mainMap.on('move', (event) => {
      if (event.originalEvent) {
        const center = this.mainMap.getCenter();
        this.props._setSearchMapCenter(center);
      }
    });
    this.mainMap.on('zoom', (event) => {
      const zoom = this.mainMap.getZoom();
      this.props._setSearchMapZoom(zoom);
    });
    this.mainMap.on('moveend', (event) => {
      const center = this.mainMap.getCenter();
      const zoom = this.mainMap.getZoom();
      const location = { lng: center.lng, lat: center.lat, zoom };
      const locationString = [center.lng, center.lat, zoom].join(',');
      if (this.props.params.mapview !== location) {
        this.props.router.push(`/imagery-search/${locationString}`);
        this.props.setMapLocation(location);
      }
    });
  },

  componentWillReceiveProps: function (nextProps) {
    const changes = diff(this.props.mainMapStyle, nextProps.mainMapStyle);
    if (changes.find(change => change.command === 'addSource')) {
      changes.forEach(change => {
        this.mainMap[change.command].apply(this.mainMap, change.args);
      });
    }
    nextProps.imageryStyles.forEach((style, index) => {
      const map = this.maps[index];
      const changes = diff(this.props.imageryStyles[index], style);
      changes.forEach(change => {
        if (change.command === 'setZoom' || change.command === 'setCenter') {
          map[change.command].apply(map, change.args);
        }
      });
    });
  },

  componentWillUnmount: function () {
    this.maps.forEach(m => { m.remove(); });
  },

  render: function () {
    const {
      mainMapStyle,
      imageryStyles,
      _setSearchMapBaselayer,
      selectedBase } = this.props;
    return (
      <section className='section section--page'>
        <header className='section__header'>
          <div className='inner'>
            <div className='section__headline'>
              <h1 className='section__title'>Search and Compare Imagery</h1>
              <p>Explore and compare existing sources of imagery prior to requesting additional imagery.</p>
            </div>
            <div className='section__actions'>
              <AddRequestLink/>
            </div>
          </div>
        </header>
        <div className='section__body'>
          <div className='inner'>
            <div className='map-master'>
              <div className='map-master__map' ref='mainMap'></div>
              <h2 className='map-master__source'>Source: {mainMapStyle.name}</h2>
            </div>
            <ul className='map-thumbs'>
              {imageryStyles.map((imageryStyle, i) => {
                const selected = selectedBase === i
                  ? 'selected__map' : 'unselected__map';
                return (
                  <li key={i} className={'map-thumbs__item'}>
                    <div className={selected}>
                      <div ref={`mapThumb${i}`}
                        onClick={ () => _setSearchMapBaselayer(i) }
                        className='map-thumbs__map'>
                      </div>
                    </div>
                    <h3 className='map-thumbs__source'>
                      {imageryStyle.name}
                    </h3>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    );
  }
});
export default ImagerySearch;
