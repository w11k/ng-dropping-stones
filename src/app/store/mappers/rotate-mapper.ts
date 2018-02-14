import { Tetris } from '../../models/tetris/tetris.model';
import * as clone from 'clone';
import { rotate } from '../../helpers/tetromino-helpers';
import { collision, rotateCollision } from '../../helpers/store-helpers';

export const rotateMapper = (state: Tetris[], index: number): Tetris[] => {
  const newState = clone<Tetris[]>(state, false);
  const game = newState[index];
  game.current.coordinates = rotate(game.current.coordinates);
  while (collision(game.board, game.current).right) {
    game.current.offset.x -= 1;
  }
  while (collision(game.board, game.current).left) {
    game.current.offset.x += 1;
  }
  if (rotateCollision(game.board, game.current)) {
    return state;
  } else {
    return newState;
  }
};
