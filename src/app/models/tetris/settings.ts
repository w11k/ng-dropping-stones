import { Status } from './tetris.model';
import { getRandomTetromino } from '../../helpers/tetromino-helpers';

export const boardWidth = 10;
export const boardHeight = 20;

export const getDefaultState = () => {
  return {
    status: Status.PLAYING,
    board: Array(boardHeight).fill(0).map(x => Array(boardWidth).fill(null)),
    current: getRandomTetromino({ x: boardWidth / 2 - 1, y: -2 }),
    next: getRandomTetromino({ x: boardWidth / 2 - 1, y: -2 }),
    score: 0
  };
};
