const Grid = require('./ui/grid');
const $ = require('jquery');

const grid = new Grid($('#container'));
grid.build();
grid.layout();
