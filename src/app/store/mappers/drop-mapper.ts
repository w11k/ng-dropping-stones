import { Tetris } from '../../game-logic/tetris/tetris.model';
import * as clone from 'clone';
import { tickMapper } from './tick-mapper';
import { dropCollision } from './mapper-helpers';

export const dropMapper = (state: Tetris): Tetris => {
  const newState = clone(state) as Tetris;
  if (newState.current === null) {
    return state;
  }

  while (!dropCollision(newState.board, newState.current)) {
    newState.current.offset.y += 1;
  }

  newState.current.offset.y -= 1;

  return tickMapper(newState);


};
