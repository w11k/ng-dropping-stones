import { Tetris } from '../../game-logic/tetris/tetris.model';
import * as clone from 'clone';
import { tickMapper } from './tick-mapper';

export const dropMapper = (state: Tetris): Tetris => {
  const newState = clone(state) as Tetris;
  if (newState.current === null) {
    return state;
  }

  while(!collision(newState)) {
    newState.current.offset.y += 1;
  }

  newState.current.offset.y -= 1;

  return tickMapper(newState);


}

const collision = (state: Tetris) => {
  const { board, current } = state;
  const coord = current.coordinates;
  const offY = current.offset.y;
  const offX = current.offset.x;
  return coord.some((row, y) => {
    return row.some((value, x) => {
      return value === 1
        && y + offY >= 0
        && (y + offY >= board.length
          || board[y + offY][x + offX] !== null);
    });
  });
}