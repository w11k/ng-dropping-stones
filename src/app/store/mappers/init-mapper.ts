import { Tetris } from '../../model/tetris/tetris.model';
import { defaultState } from '../../model/tetris/settings';

export const initMapper = (length: number): Tetris[] => {
  return Array(length).fill(defaultState);
};
