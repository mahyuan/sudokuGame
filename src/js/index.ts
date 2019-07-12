// const Grid = require('./ui/grid');
// const $ = require('jquery');
// const PopupNumbers = require('./ui/popupnumbers');

import $ from 'jquery';
import Grid from './ui/grid';
import PopupNumbers from './ui/popupnumbers';

const grid = new Grid($('#container'));
grid.build();
grid.layout();

const popupNumbers = new PopupNumbers($('#popupNumbers'));
grid.bindPopup(popupNumbers);

$('#check').on('click', event => {
  if (grid.check()) {
    alert('success');
  }
});

$('#reset').on('click', event => {
  grid.reset();
});

$('#clear').on('click', event => {
  grid.clear();
});

$('#rebuild').on('click', event => {
  grid.rebuild();
});

