import { TetrominoType, Tetromino, Offset } from './tetromino.model';

export class tetromino {

  private static types: TetrominoType[] = [
    TetrominoType.I,
    TetrominoType.J,
    TetrominoType.L,
    TetrominoType.O,
    TetrominoType.S,
    TetrominoType.T,
    TetrominoType.Z,
  ];

  private static coordinates = [
    [ // I
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    [ // J
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    [ // L
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [ // O
      [1, 1],
      [1, 1],
    ],
    [ // S
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [ // T
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [ // Z
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],

  ];

  constructor() { }

  private static random<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  static rotate(matrix: number[][], times = 1): number[][] {
    let result = matrix.slice();
    for (let i = 0; i < times; i++) {
      result = result[0].map((x, i) => result.map(x => x[i]).reverse());
    }
    return result;
  }

  static getRandom(offset: Offset = { x: 0, y: 0 }): Tetromino {
    const type = tetromino.random<TetrominoType>(tetromino.types);
    const coordinates = tetromino.rotate(tetromino.coordinates[type], tetromino.random([0, 1, 2, 3]));

    const t: Tetromino = {
      type,
      offset,
      coordinates
    };
    return t;
  }

}
