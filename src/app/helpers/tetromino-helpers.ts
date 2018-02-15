import { Offset, Tetromino, TetrominoType } from '../models/tetromino/tetromino.model';

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
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  'J': [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  'L': [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  'O': [
    [1, 1],
    [1, 1],
  ],
  'S': [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  'T': [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  'Z': [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],

};

const random = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const rotate = (matrix: number[][], times = 1): number[][] => {
  let result = matrix.slice();
  for (let i = 0; i < times; i++) {
    result = result[0].map((_, index) => result.map(x => x[index]).reverse());
  }
  return result;
};

export const getRandomTetromino = (offset: Offset = {x: 0, y: 0}): Tetromino => {
  const type = random(tetrominoTypes);
  const rotated = rotate(tetrominoCoordinates[type], random([0, 1, 2, 3]));

  return {
    type,
    offset,
    coordinates: rotated
  };
};

