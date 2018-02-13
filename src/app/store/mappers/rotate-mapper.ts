import { Tetris } from '../../model/tetris/tetris.model';
import * as clone from 'clone';
import { rotate } from '../../helpers/tetromino-helpers';
import { anyCollision, leftCollision, rightCollision } from '../../helpers/store-helpers';

export const rotateMapper = (state: Tetris[], index: number): Tetris[] => {
  const newState = clone<Tetris[]>(state, false);
  const game = newState[index];
  game.current.coordinates = rotate(game.current.coordinates);
  while (rightCollision(game.board, game.current)) {
    game.current.offset.x -= 1;
  }
  while (leftCollision(game.board, game.current)) {
    game.current.offset.x += 1;
  }
  if (anyCollision(game.board, game.current)) {
    return state;
  } else {
    return newState;
  }
};
