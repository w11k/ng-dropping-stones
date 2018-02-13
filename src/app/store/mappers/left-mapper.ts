import { Tetris } from '../../model/tetris/tetris.model';
import * as clone from 'clone';
import { leftCollision } from '../../helpers/store-helpers';

export const leftMapper = (state: Tetris[], index: number): Tetris[] => {
  const newState = clone<Tetris[]>(state, false);
  const game = newState[index];
  game.current.offset.x -= 1;
  if (leftCollision(game.board, game.current)) {
    game.current.offset.x += 1;
  }
  return newState;
};
