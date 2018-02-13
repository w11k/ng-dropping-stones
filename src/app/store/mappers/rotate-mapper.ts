import { Tetris } from '../../model/tetris/tetris.model';
import * as clone from 'clone';
import { rotate } from '../../helpers/tetromino-helpers';
import { anyCollision, leftCollision, rightCollision } from '../../helpers/store-helpers';

export const rotateMapper = (state: Tetris[], index: number): Tetris[] => {
  const newState = clone(state);
  const game = newState[index];
  game.current.coordinates = rotate(game.current.coordinates);
  while (rightCollision(game.board, game.current)) {
    game.current.offset.x -= 1;
    console.log('push left');
  }
  while (leftCollision(game.board, game.current)) {
    game.current.offset.x += 1;
    console.log('push right');
  }
  if (anyCollision(game.board, game.current)) {
    return state;
  } else {
    return newState;
  }
};
