const $ = require('jquery');
// const Generator = require('../core/generator');
const Sudoku = require('../core/sudoku');
const Checker = require('../core/checker');

class Grid {
  constructor(container) {
    this._$container = container;
  }

  build() {
    // const generator = new Generator();
    // generator.generate();
    // const matrix = generator.matrix;
    // console.log('matrix', matrix);

    const sudoku = new Sudoku();
    sudoku.make();
    const matrix = sudoku.puzzleMatrix;
    // const matrix = sudoku.solutionMartix;

    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
    const colGroupClasses = ['col_g_left', 'col_g_middle', 'col_g_right'];

    const $cells = matrix.map(rowValues =>
      rowValues.map((cellValue, colIndex) => {
        return $('<span>')
          .addClass(colGroupClasses[colIndex % 3])
          .addClass(cellValue ? 'fixed' : 'empty')
          .text(cellValue);
      })
    );

    const $divArray = $cells.map(($spanArray, rowIndex) => {
      return $('<div>')
        .addClass('row')
        .addClass(rowGroupClasses[rowIndex % 3])
        .append($spanArray);
    });

    this._$container.append($divArray);
  }

  layout() {
    const width = $('span:first', this._$container).width();
    $('span', this._$container)
      .height(width)
      .css({
        'line-height': `${width}px`,
        'font-size': width < 32 ? `${width / 2}px` : ''
      });
  }

  check() {
    // Checker
    // const data = [];
    const $rows = this._$container.children();
    const data = $rows.map((rowIndex, div) => {
      return $(div).children()
        .map((colIndex, span) => parseInt($(span).text()) || 0);
    }).toArray().map($data => $data.toArray());

    console.log('data', data);
    const checker = new Checker(data);

    if (!checker.check()) {
      const marks = checker.matrixMarks;
      this._$container.children().each((rowIndex, div) => {
        $(div).children().each((colIndex, span) => {
          const $span = $(span);
          if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
            $span.removeClass('error');
          } else {
            $span.addClass('error');
          }
        });
      });
    } else {
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
      const $cell = $(event.target);
      if (!$cell.is('.fixed')) {
        popupNumbers.popup($cell);
      }
    });
  }
}

module.exports = Grid;
