import { Tetris } from '../../game-logic/tetris/tetris.model';
import { defaultState } from '../../game-logic/tetris/settings';

export const initMapper = (): Tetris => {
  return defaultState;
};
