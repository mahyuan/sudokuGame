"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 生成数独游戏
 * 生成完成的解决方案： Generator
 * 随机去除部分数据
 */
const generator_1 = __importDefault(require("./generator"));
class Sudoku {
    constructor() {
        const generator = new generator_1.default();
        generator.generate();
        this.solutionMartix = generator.matrix;
    }
    make(level = 5) {
        // 生成密盘
        this.puzzleMatrix = this.solutionMartix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 : cell);
        });
    }
}
;
exports.default = Sudoku;
