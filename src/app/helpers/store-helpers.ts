import { Board, DisplayBoard } from '../model/tetris/tetris.model';
import { Tetromino } from '../model/tetromino/tetromino.model';

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

export interface CollisionType {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  piece?: boolean;
}

export const collision = (board: Board | DisplayBoard, current: Tetromino): CollisionType => {
  const collisionType: CollisionType = {};
  const coord = current.coordinates;
  const offY = current.offset.y;
  const offX = current.offset.x;

  coord.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        if (y + offY < 0) {
          collisionType.top = true;
        }
        if (y + offY > board.length - 1) {
          collisionType.bottom = true;
        }
        if (x + offX < 0) {
          collisionType.left = true;
        }
        if (x + offX > board[0].length - 1) {
          collisionType.right = true;
        }
        if (
          board[y + offY] &&
          board[y + offY][x + offX] &&
          board[y + offY][x + offX] !== null
        ) {
          collisionType.piece = true;
        }
      }
    });
  });

  return collisionType;
};
