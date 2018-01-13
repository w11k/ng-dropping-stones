import { Tetris } from '../../game-logic/tetris/tetris.model';
import { clone } from '../helpers';
import { tetromino } from '../../game-logic/tetromino/tetromino';

export const tickMapper = (state: Tetris) => {
  const newState = clone(state) as Tetris;
  newState.current.offset.y += 1;

  if (collision(newState)) {
    console.log('collision!');
    newState.current.offset.y -= 1;
    const offX = newState.current.offset.x;
    const offY = newState.current.offset.y;

    // write block to board
    newState.current.coordinates.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          newState.board[y + offY][x + offX] = newState.current.type;
        }
      });
    });
    newState.current = tetromino.getRandom();
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
        && (y + offY >= board.length
          || board[y + offY][x + offX] !== null);
    });
  });

}