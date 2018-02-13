import { Tetris } from '../../model/tetris/tetris.model';
import * as clone from 'clone';
import { rotate } from '../../helpers/tetromino-helpers';
import { anyCollision, leftCollision, rightCollision } from '../../helpers/store-helpers';

export const rotateMapper = (state: Tetris): Tetris => {
  const newState = clone(state);
  newState.current.coordinates = rotate(newState.current.coordinates);

  while (rightCollision(newState.board, newState.current)) {
    newState.current.offset.x -= 1;
    console.log('push left');
  }
  while (leftCollision(newState.board, newState.current)) {
    newState.current.offset.x += 1;
    console.log('push right');
  }

  if (anyCollision(newState.board, newState.current)) {
    return state;
  } else {
    return newState;
  }

};
