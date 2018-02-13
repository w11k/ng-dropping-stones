import { Tetris } from '../../model/tetris/tetris.model';
import * as clone from 'clone';
import { tickMapper } from './tick-mapper';
import { downCollision } from '../../helpers/store-helpers';

export const dropMapper = (state: Tetris): Tetris => {
  const newState = clone(state) as Tetris;
  if (newState.current === null) {
    return state;
  }
  while (!downCollision(newState.board, newState.current)) {
    newState.current.offset.y += 1;
  }
  newState.current.offset.y -= 1;
  return tickMapper(newState);
};
