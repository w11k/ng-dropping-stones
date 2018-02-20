import { Tetromino, TetrominoType } from '../models/tetromino/tetromino.model';

const tetrominoTypes: TetrominoType[] = [
  TetrominoType.I,
  TetrominoType.J,
  TetrominoType.L,
  TetrominoType.O,
  TetrominoType.S,
  TetrominoType.T,
  TetrominoType.Z,
];

const tetrominoCoordinates = {
  'I': [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  'J': [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  'L': [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  'O': [
    [1, 1],
    [1, 1],
  ],
  'S': [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  'T': [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  'Z': [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],

};

export const rotate = (matrix: number[][], times = 1): number[][] => {
  let result = matrix.slice();
  for (let i = 0; i < times; i++) {
    result = result[0].map((_, index) => result.map(x => x[index]).reverse());
  }
  return result;
};

export const flatten = <T>(array: T[][]): T[] => {
  return [].concat(...array);
};

const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const randomGenerator = (): Tetromino[] => {
  return shuffle<TetrominoType>(tetrominoTypes)
    .map(type => ({
      type,
      offset: { x: 4, y: -2 },
      coordinates: tetrominoCoordinates[type]
    }));
};
