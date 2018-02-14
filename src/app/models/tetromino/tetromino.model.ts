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
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z'
}
