import { Tetris, Board, DisplayBoard } from '../../model/tetris/tetris.model';
import { Tetromino, TetrominoType } from '../../model/tetromino/tetromino.model';

export const dropCollision = (board: Board | DisplayBoard, current: Tetromino): boolean => {
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
