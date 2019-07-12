
import Toolkit from './toolkit'

// 检查数据是否重复
function checkArray(array: number[]): boolean[] {
  const length = array.length;
  const marks: boolean[] = new Array(length);
  marks.fill(true);
  for (let i = 0; i < length - 1; i++) {
    if (!marks[i]) {
      continue;
    }

    const val = array[i];
    // 是否有效： 0：无效， 1-9：有效
    if (!val) {
      marks[i] = false;
      continue;
    }

    // 是否有重复 i + 1 ~ 9. 是否和 i 位置数据重复
    for (let j = i + 1; j < length; j++) {
      if (val === array[j]) {
        marks[i] = marks[j] = false;
      }
    }
  }
  return marks;
}

/**
 * 输入：matrix，用户完成的数独数据 9x9
 * 处理：对 mactrix 行、列、宫进行检查，并填写 marks
 * 输出：检查是否成功，marks
 */
class Checker {
  private _matrix: number[][];
  private _matrixMarks: boolean[][];
  private _success: boolean = false;

  constructor(matrix: number[][]) {
    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  get matrixMarks(): boolean[][] {
    return this._matrixMarks;
  }

  get isSuccess(): boolean {
    return this._success;
  }

  check(): boolean {
    this.checkRows();
    this.checkCols();
    this.checkBoxes();

    this._success = this._matrixMarks.every(row => row.every(mark => mark));
    return this._success;
  }

  private checkRows() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._matrix[rowIndex];
      const marks = checkArray(row);

      for (let colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  private checkCols() {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cols: Array<number> = [] ;
      for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
        cols[rowIndex] = this._matrix[rowIndex][colIndex];
      }

      const marks = checkArray(cols);
      for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
        if (!marks[rowIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  private checkBoxes() {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
      const marks = checkArray(boxes);
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        if (!marks[cellIndex]) {
          const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }
}

export default Checker;

