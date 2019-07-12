"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const grid_1 = __importDefault(require("./ui/grid"));
const popupnumbers_1 = __importDefault(require("./ui/popupnumbers"));
const grid = new grid_1.default(jquery_1.default('#container'));
grid.build();
grid.layout();
const popupNumbers = new popupnumbers_1.default(jquery_1.default('#popupNumbers'));
grid.bindPopup(popupNumbers);
jquery_1.default('#check').on('click', event => {
    if (grid.check()) {
        alert('success');
    }
});
jquery_1.default('#reset').on('click', event => {
    grid.reset();
});
jquery_1.default('#clear').on('click', event => {
    grid.clear();
});
jquery_1.default('#rebuild').on('click', event => {
    grid.rebuild();
});
