import { collision } from './store-helpers';
import { Tetromino, TetrominoType } from '../models/tetromino/tetromino.model';
import { Board } from '../models/tetris/tetris.model';

describe('collision function', () => {

  let board: Board;
  let tetromino: Tetromino;

  beforeEach(() => {
    board = Array(10).fill(0).map(x => Array(5).fill(null));
    const type = TetrominoType.L;
    const offset = {x: 0, y: 0};
    const coordinates = [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
    tetromino = {type, offset, coordinates};
  });

  it('should identify no collision', () => {
    expect(collision(board, tetromino)).toEqual({});
  });
  it('should identify top collision', () => {
    tetromino.offset.y = -1;
    expect(collision(board, tetromino).top).toBe(true);
  });
  it('should identify left collision', () => {
    tetromino.offset.x = -2;
    expect(collision(board, tetromino).left).toBe(true);
  });
  it('should identify right collision', () => {
    tetromino.offset.x = 3;
    expect(collision(board, tetromino).right).toBe(true);
    tetromino.offset.x = 100;
    expect(collision(board, tetromino).right).toBe(true);
  });
  it('should identify bottom collision', () => {
    tetromino.offset.y = 8;
    expect(collision(board, tetromino).bottom).toEqual(true);
    tetromino.offset.y = 10;
    expect(collision(board, tetromino).bottom).toEqual(true);
  });
  it('should identify piece collision', () => {
    board[0][0] = TetrominoType.J;
    expect(collision(board, tetromino).piece).toBeFalsy();
    board[0][1] = TetrominoType.J;
    expect(collision(board, tetromino).piece).toBe(true);
    tetromino.offset.x = 1;
    expect(collision(board, tetromino).piece).toBeFalsy();
  });

});
