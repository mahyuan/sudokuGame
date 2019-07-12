export interface IBoxCoord {
  boxIndex: number,
  cellIndex: number
}

export interface IRowCoord {
  rowIndex: number,
  colIndex: number
}

/**
 * 宫坐标系工具
 */
class boxToolkit {
  static getBoxCells(matrix: number[][], boxIndex: number): number[] {
    const startRowIndex = Math.floor(boxIndex / 3) * 3;
    const startColIndex = boxIndex % 3 * 3;

    const result: Array<number> = [];

    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      const colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }
    return result;
  }

  static converToBoxIndex(rowIndex: number, colIndex: number): IBoxCoord {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 + 3 + colIndex % 3
    };
  }

  static convertFromBoxIndex(boxIndex: number, cellIndex: number): IRowCoord {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 + 3 + cellIndex % 3
    };
  }
};

/**
 * 矩阵和数组相关工具
 */
class matrixToolkit {
  // 重载
  static makeRow(): number[];
  static makeRow<T>(v: T): T[]
  static makeRow(v: any = 0): any[] {
    const array = new Array(9);
    array.fill(v);
    return array;
  }

  static makeMatrix(): number[][];
  static makeMatrix<T>(v: T): T[][];

  static makeMatrix(v: any = 0) {
    return Array.from({ length: 9 }, () => this.makeRow(v));
  }

  /**
   * Fisher-Yates 洗牌算法
   */
  static shuffle<T>(array: T[]): T[] {
    const endIndex = array.length - 2;
    for (let i = 0; i <= endIndex; i++) {
      const j = Math.floor(Math.random() * (array.length - i)) + i;
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * 检查指定位置是否可以填写数字n
   */
  static checkFillable(matrix: number[][], n: number, rowIndex: number, colIndex: number): boolean {
    const row = matrix[rowIndex];
    const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
    const { boxIndex } = boxToolkit.converToBoxIndex(rowIndex, colIndex);
    const box = boxToolkit.getBoxCells(matrix, boxIndex);

    for (let i = 0; i < 9; i++) {
      if (row[i] === n || column[i] === n || box[i] === n) {
        return false;
      }
    }
    return true;
  }

};



// 工具集
export class Toolkit {
  static get matrix(): typeof matrixToolkit {
    return matrixToolkit;
  }

  static get box() {
    return boxToolkit;
  }
};

export default Toolkit;
