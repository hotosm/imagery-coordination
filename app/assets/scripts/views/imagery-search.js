import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ImagerySearch from '../components/imagery-search';
import { setSearchMapCenter, setSearchMapZoom, setSearchMapBaseLayer }
  from '../actions/imagery-search-actions';
import { setMapLocation } from '../actions/map-actions';

function mapStateToProps (state) {
  const { mainMapStyle, imageryStyles, selectedBase } = state.imagerySearch;
  return {
    mainMapStyle,
    imageryStyles,
    selectedBase
  };
}

function mapDispatchToProps (dispatch) {
  return {
    _setSearchMapCenter: center => dispatch(setSearchMapCenter(center)),
    _setSearchMapZoom: zoom => dispatch(setSearchMapZoom(zoom)),
    _setSearchMapBaselayer: id => dispatch(setSearchMapBaseLayer(id)),
    setMapLocation: location => dispatch(setMapLocation(location))
  };
}

module.exports = connect(mapStateToProps,
                         mapDispatchToProps)(withRouter(ImagerySearch));
