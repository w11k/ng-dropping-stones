import { Board } from '../model/tetris/tetris.model';
import { Tetromino } from '../model/tetromino/tetromino.model';

export interface CollisionType {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  piece?: boolean;
}

export const collision = (board: Board, current: Tetromino): CollisionType => {
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

export const downCollision = (board: Board, current: Tetromino): boolean => {
  const c = collision(board, current);
  return c.bottom || c.piece;
};

export const leftCollision = (board: Board, current: Tetromino): boolean => {
  const c = collision(board, current);
  return c.left || c.piece;
};

export const rightCollision = (board: Board, current: Tetromino): boolean => {
  const c = collision(board, current);
  return c.right || c.piece;
};

export const rotateCollision = (board: Board, current: Tetromino): boolean => {
  const c = collision(board, current);
  return c.right || c.left || c.bottom || c.piece;
};
