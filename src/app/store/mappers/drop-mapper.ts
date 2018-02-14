import { Tetris } from '../../models/tetris/tetris.model';
import * as clone from 'clone';
import { tickMapper } from './tick-mapper';
import { downCollision } from '../../helpers/store-helpers';

export const dropMapper = (state: Tetris[], index: number): Tetris[] => {
  const newState = clone<Tetris[]>(state, false);
  const game = newState[index];
  if (game.current === null) {
    return state;
  }
  while (!downCollision(game.board, game.current)) {
    game.current.offset.y += 1;
  }
  game.current.offset.y -= 1;
  return tickMapper(newState, index);
};
