export interface Tetromino {
  type: TetrominoType;
  offset: Offset;
  coordinates: number[][];
}

export interface Offset {
  x: number;
  y: number;
}

export enum TetrominoType {
  I,
  J,
  L,
  O,
  S,
  T,
  Z,
}
