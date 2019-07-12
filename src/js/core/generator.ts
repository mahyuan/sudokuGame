/**
 * 生成数独解决方案
 */
// const Toolkit = require('./toolkit');
import Toolkit from './toolkit';

class Generator {
  generate() {
    while (!this.internalGenerate()) {
      //
    }
  }

  internalGenerate() {
    this.matrix = Toolkit.matrix.makeMatrix();
    this.orders = Toolkit.matrix
      .makeMatrix()
      .map(row => row.map((v, i) => i))
      .map(row => Toolkit.matrix.shuffle(row));

    for (let n = 1; n <= 9; n++) {
      if (!this.fillNumber(n)) {
        return false;
      }
    }
    return true;
  }

  fillNumber(n) {
    return this.fillRow(n, 0);
  }

  // 当前行填写n成功，递归调用 fillRow 来在下一行填写n
  fillRow(n, rowIndex) {
    if (rowIndex > 8) {
      return true;
    }

    const row = this.matrix[rowIndex];
    const orders = this.orders[rowIndex];

    for (let i = 0; i < 9; i++) {
      const colIndex = orders[i];
      // 如果这个位置有值，跳过
      if (row[colIndex]) {
        continue;
      }

      // 检查这个位置是否可以填n
      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue;
      }

      row[colIndex] = n;

      // 去下一行填写n, 如果没填进去，就继续寻找当前行的下一个位置
      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0;
        continue;
      }

      return true;
    }

    return false;
  }
}

export default Generator;

// const generator = new Generator();
// generator.generate();
// console.log('-----------------generator.matrix---------------');
// console.log(generator.matrix);
