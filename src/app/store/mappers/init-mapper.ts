import { Tetris } from '../../models/tetris/tetris.model';
import { newTetris } from '../../models/tetris/settings';
import { randomGenerator } from '../../helpers/tetromino-helpers';

export const initMapper = (length: number): Tetris[] => {
  const res = [];
  const next = randomGenerator();
  const current = next.shift();

  for (let i = 0; i < length; i++) {
    res.push(newTetris({ ...current }, next.slice()));
  }
  return res;
};
