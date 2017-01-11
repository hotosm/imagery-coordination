'use strict';

module.exports = [
  {
    id: 'satellite',
    type: 'raster',
    name: 'Mapbox Satellite',
    url: 'https://api.mapbox.com/styles/v1/hot/civicyccw00bv2io77zqq401h/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaG90IiwiYSI6ImNpdmlkM2lkMDAwYTAydXBnNXFkd2EwemsifQ.KPrUb_mKlPmHCR6LNrSihQ'
  },
  {
    id: 'digital-globe',
    type: 'raster',
    name: 'Digital Globe',
    url: 'https://api.mapbox.com/styles/v1/digitalglobe/ciode6t5k0081aqm7k06dod4v/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpdHZtM3FjbzAwNjYyem40c3FlNG11eGkifQ.dxTyi-e8nUFGtGQON78xQA'
  },
  {
    id: 'bing-satellite',
    type: 'raster',
    name: 'Bing Satellite',
    url: 'http://t1.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1398'
  }
];
