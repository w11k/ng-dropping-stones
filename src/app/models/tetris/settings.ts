import { Status, Tetris } from './tetris.model';
import { Tetromino } from '../tetromino/tetromino.model';

export const boardWidth = 10;
export const boardHeight = 20;

export const newTetris = (current: Tetromino, next: Tetromino[]): Tetris => {
  return {
    status: Status.PLAYING,
    board: Array(boardHeight).fill(0).map(x => Array(boardWidth).fill(null)),
    current,
    next,
    score: 0
  };
};
