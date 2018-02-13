import { Tetris } from '../../model/tetris/tetris.model';
import * as clone from 'clone';
import { leftCollision } from '../../helpers/store-helpers';

export const leftMapper = (state: Tetris): Tetris => {

  if (state.current === null) {
    return state;
  }

  const newState = clone(state);
  newState.current.offset.x -= 1;
  if (leftCollision(newState.board, newState.current)) {
    console.log('nope left');
    newState.current.offset.x += 1;
  }
  return newState;
};
