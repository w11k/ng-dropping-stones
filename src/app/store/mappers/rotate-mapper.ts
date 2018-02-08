import { Tetris } from '../../game-logic/tetris/tetris.model';
import * as clone from 'clone';
import { TetrominoHelper } from '../../game-logic/tetromino/tetromino-helper';

export const rotateMapper = (state: Tetris): Tetris => {
  const newState = clone(state);
  newState.current.coordinates = TetrominoHelper.rotate(newState.current.coordinates);

  while (rightCollision(newState)) {
    newState.current.offset.x -= 1;
    console.log('push left');
  }
  while (leftCollision(newState)) {
    newState.current.offset.x += 1;
    console.log('push right');
  }

  if (collision(newState)) {
    return state;
  } else {
    return newState;
  }

};

const leftCollision = (state: Tetris): boolean => {
  const { current } = state;
  const { offset } = current;
  return current.coordinates.some((row, y) => {
    return row.some((value, x) => {
      return value === 1 && x + offset.x < 0;
    });
  });
};
const rightCollision = (state: Tetris): boolean => {
  const { current, board } = state;
  const { offset } = current;
  return current.coordinates.some((row, y) => {
    return row.some((value, x) => {
      return value === 1 && x + offset.x >= board[0].length;
    });
  });
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
};
