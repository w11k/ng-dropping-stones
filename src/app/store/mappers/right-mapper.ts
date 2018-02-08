import { Tetris } from "../../game-logic/tetris/tetris.model";
import * as clone from 'clone';

export const rightMapper = (state: Tetris): Tetris => {

  if (state.current === null) {
    return state;
  }

  const newState = clone(state);
  newState.current.offset.x += 1;
  if (collision(newState)) {
    console.log('nope right');
    newState.current.offset.x -= 1;
  }
  return newState;
}

const collision = (state: Tetris) => {
  const { board, current } = state;
  const coord = current.coordinates;
  const offY = current.offset.y;
  const offX = current.offset.x;

  return coord.some((row, y) => {
    return row.some((value, x) => {

      return value === 1
        && (x + offX > board[0].length
        || (y + offY >= 0
          && board[y + offY][x + offX] !== null));
    });
  });

}