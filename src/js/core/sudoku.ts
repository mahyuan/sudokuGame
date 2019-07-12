/**
 * 生成数独游戏
 * 生成完成的解决方案： Generator
 * 随机去除部分数据
 */
import Generator from './generator';

class Sudoku {
  solutionMartix: number[][];
  puzzleMatrix: number[][];

  constructor() {
    const generator = new Generator();
    generator.generate();
    this.solutionMartix = generator.matrix;
  }

  make(level: number = 5) {
    // 生成密盘
    this.puzzleMatrix = this.solutionMartix.map(row => {
      return row.map(cell => Math.random() * 9 < level ? 0 : cell);
    });
  }
};

export default Sudoku;
