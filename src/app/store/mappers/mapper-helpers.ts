import { Tetris } from '../../game-logic/tetris/tetris.model';

export const dropCollision = (state: Tetris): boolean => {
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
