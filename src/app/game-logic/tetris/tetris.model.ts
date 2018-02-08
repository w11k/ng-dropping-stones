import { TetrominoType, Tetromino } from '../tetromino/tetromino.model';

export interface Tetris {
  status: Status;
  board: Board;
  current: Tetromino;
  next: Tetromino;
  score: number;
}

export type Board = TetrominoType[][] | null[][];

export enum Status {
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}
