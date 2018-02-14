import { Tetris } from '../../models/tetris/tetris.model';
import { getDefaultState } from '../../models/tetris/settings';

export const initMapper = (length: number): Tetris[] => {
  const res = [];
  for (let i = 0; i < length; i++) {
    res.push(getDefaultState());
  }
  return res;
};
