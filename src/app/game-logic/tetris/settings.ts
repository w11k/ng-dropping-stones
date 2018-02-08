import { Tetris, Status } from './tetris.model';
import { TetrominoHelper } from '../tetromino/tetromino-helper';

export const boardWidth = 10;
export const boardHeight = 20;

const board = Array(boardHeight).fill(0).map(x => Array(boardWidth).fill(null));

export const defaultState: Tetris = {
  status: Status.PLAYING,
  board,
  current: TetrominoHelper.getRandom({ x: boardWidth / 2 - 1, y: -2 }),
  score: 0
};
