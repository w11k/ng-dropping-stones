import { Status } from './tetris.model';
import { randomGenerator } from '../../helpers/tetromino-helpers';

export const boardWidth = 10;
export const boardHeight = 20;

export const getDefaultState = () => {
  const generated = randomGenerator();
  return {
    status: Status.PLAYING,
    board: Array(boardHeight).fill(0).map(x => Array(boardWidth).fill(null)),
    current: generated.shift(),
    next: generated,
    score: 0
  };
};
