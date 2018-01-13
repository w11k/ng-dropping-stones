import { Tetris, Status } from './tetris.model';
import { TetrominoHelper } from '../tetromino/tetromino-helper';

export const boardWidth = 10;
export const boardHeight = 15;

const board = new Array(boardHeight).fill(
  new Array(boardWidth).fill(null)
);

export const defaultState: Tetris = {
  status: Status.PLAYING,
  board,
  current: TetrominoHelper.getRandom({ x: boardWidth / 2 - 1, y: -2 })
};