import { Tetris } from '../../models/tetris/tetris.model';
import * as clone from 'clone';
import { rightCollision } from '../../helpers/store-helpers';

export const rightMapper = (state: Tetris[], index: number): Tetris[] => {
  const newState = clone<Tetris[]>(state, false);
  const game = newState[index];
  game.current.offset.x += 1;
  if (rightCollision(game.board, game.current)) {
    game.current.offset.x -= 1;
  }
  return newState;
};
