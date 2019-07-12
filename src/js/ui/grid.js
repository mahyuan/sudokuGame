"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const sudoku_1 = __importDefault(require("../core/sudoku"));
const checker_1 = __importDefault(require("../core/checker"));
class Grid {
    constructor(container) {
        this._$container = container;
    }
    build() {
        const sudoku = new sudoku_1.default();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;
        // const matrix = sudoku.solutionMartix;
        const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
        const colGroupClasses = ['col_g_left', 'col_g_middle', 'col_g_right'];
        const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
            return jquery_1.default('<span>')
                .addClass(colGroupClasses[colIndex % 3])
                .addClass(cellValue ? 'fixed' : 'empty')
                .text(cellValue);
        }));
        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return jquery_1.default('<div>')
                .addClass('row')
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });
        this._$container.append($divArray);
    }
    layout() {
        const width = jquery_1.default('span:first', this._$container).width();
        jquery_1.default('span', this._$container)
            .height(width)
            .css({
            'line-height': `${width}px`,
            'font-size': width < 32 ? `${width / 2}px` : ''
        });
    }
    check() {
        const $rows = this._$container.children().toArray();
        const data = $rows.map((div) => {
            return jquery_1.default(div).children().toArray()
                .map(span => parseInt(jquery_1.default(span).text(), 10) || 0);
        });
        const checker = new checker_1.default(data);
        if (!checker.check()) {
            const marks = checker.matrixMarks;
            this._$container.children().each((rowIndex, div) => {
                jquery_1.default(div).children().each((colIndex, span) => {
                    const $span = jquery_1.default(span);
                    if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
                        $span.removeClass('error');
                    }
                    else {
                        $span.addClass('error');
                    }
                });
            });
        }
        else {
            return true;
        }
    }
    reset() {
        this._$container.find('span:not(.fixed')
            .removeClass('error mark1 mark2')
            .addClass('empty')
            .text(0);
    }
    clear() {
        this._$container.find('apan:error')
            .removeClass('eror');
    }
    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }
    bindPopup(popupNumbers) {
        this._$container.on('click', 'span', event => {
            const $cell = jquery_1.default(event.target);
            if (!$cell.is('.fixed')) {
                popupNumbers.popup($cell);
            }
        });
    }
}
exports.default = Grid;
