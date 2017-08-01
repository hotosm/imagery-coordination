import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'oam-design-system';
import classNames from 'classnames';
import { setMapBaseLayer } from '../actions';

const StyleSwitcher = (props) => {
  return (
    <Dropdown
      triggerElement='a'
      triggerClassName='button-layers'
      triggerActiveClassName='button--active'
      triggerTitle='Choose map layer'
      triggerText='Choose map layer'
      direction='left'
      className='drop__content--maplayers'
      alignment='middle'>
      <ul className='drop__menu drop__menu--select map-layers-list'>
        {props.baseLayers.map(baseLayer =>
          <li key={baseLayer.id}>
            <Layer
              layer={baseLayer}
              baseLayer={props.baseLayer}
              onLayerSelect={() => { props.setMapBaseLayer(baseLayer); }}/>
          </li>)}
      </ul>
  </Dropdown>
  );
};

StyleSwitcher.propTypes = {
  baseLayers: T.array.isRequired,
  baseLayer: T.shape({
    id: T.string.isRequired,
    name: T.string.isRequired
  }).isRequired,
  setMapBaseLayer: T.func.isRequired
};

const Layer = (props) => {
  let displayClass = classNames({
    'drop__menu-item': true,
    'drop__menu-item--active': props.baseLayer.id === props.layer.id
  });
  return (
    <a
      className={displayClass}
      onClick={props.onLayerSelect}
      data-hook='dropdown:close'>
      <span className='map-layers-list__text'>{props.layer.name}</span>
    </a>
  );
};

Layer.propTypes = {
  layer: T.shape({
    id: T.string.isRequired,
    name: T.string.isRequired
  }).isRequired,
  baseLayer: T.shape({
    id: T.string.isRequired,
    name: T.string.isRequired
  }).isRequired,
  onLayerSelect: T.func.isRequired
};

function mapStateToProps (state) {
  return {
    baseLayer: state.map.baseLayer,
    baseLayers: state.map.baseLayers
  };
}

function mapDispatchToProps (dispatch) {
  return {
    setMapBaseLayer: (layer) => dispatch(setMapBaseLayer(layer))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleSwitcher);
