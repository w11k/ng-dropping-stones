import { TetrominoType, Tetromino } from "../tetromino/tetromino.model";

export interface Tetris {
  status: Status;
  board: TetrominoType[][] | null[][];
  current: Tetromino | null;
}

export enum Status {
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}
