'use strict';

const mapLayers = [
  {
    id: 'oam-base',
    type: 'raster',
    imagerySearch: false,
    name: 'Mapbox Light',
    url: 'https://api.mapbox.com/styles/v1/hot/cividbt4w00ax2jn8517i2nc9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaG90IiwiYSI6ImNpdmlkM2lkMDAwYTAydXBnNXFkd2EwemsifQ.KPrUb_mKlPmHCR6LNrSihQ'
  },
  {
    id: 'satellite',
    type: 'raster',
    imagerySearch: true,
    name: 'Mapbox Satellite',
    url: 'https://api.mapbox.com/styles/v1/hot/civicyccw00bv2io77zqq401h/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaG90IiwiYSI6ImNpdmlkM2lkMDAwYTAydXBnNXFkd2EwemsifQ.KPrUb_mKlPmHCR6LNrSihQ'
  },
  {
    id: 'digital-globe',
    type: 'raster',
    imagerySearch: true,
    name: 'Digital Globe',
    url: 'https://api.mapbox.com/styles/v1/digitalglobe/ciode6t5k0081aqm7k06dod4v/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpdHZtM3FjbzAwNjYyem40c3FlNG11eGkifQ.dxTyi-e8nUFGtGQON78xQA'
  },
  {
    id: 'bing-satellite',
    type: 'raster',
    imagerySearch: true,
    name: 'Bing Satellite',
    url: 'http://t1.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1398'
  }
];

export default mapLayers;

export function getImagerySearchLayers () {
  return mapLayers.filter(m => m.imagerySearch);
}
