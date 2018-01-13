import { Tetris } from '../../game-logic/tetris/tetris.model';
import { clone } from '../helpers';

export const tickMapper = (state: Tetris) => {
  const newState = clone(state);
  newState.current.offset.y += 1;

  // collision detection here
  if (collision(newState)) {
    console.log('collision!');
  }

  return newState;
};

const collision = (state: Tetris) => {
  const { board, current } = state;
  const coord = current.coordinates;
  const offY = current.offset.y;
  const offX = current.offset.x;

  return coord.some((row, y) => {
    return row.some((value, x) => {
      return value === 1
        && y + offY >= 0
        && y + offY >= board.length
        || board[y][x] !== null;
    });
  });

} 