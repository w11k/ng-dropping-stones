import { Tetris } from '../../model/tetris/tetris.model';
import * as clone from 'clone';
import { rightCollision } from '../../helpers/store-helpers';

export const rightMapper = (state: Tetris): Tetris => {

  if (state.current === null) {
    return state;
  }

  const newState = clone(state);
  newState.current.offset.x += 1;
  if (rightCollision(newState.board, newState.current)) {
    console.log('nope right');
    newState.current.offset.x -= 1;
  }
  return newState;
};
