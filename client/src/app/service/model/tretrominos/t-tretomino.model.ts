import {Tretromino} from './tetromino.model';
import {TretrominoType} from '../../game.constants';
export class TTretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX, TretrominoType.TTYPE);
  }
}

const ROTATIONS_MATRIX = [
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0]
  ],
  [
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 1],
    [1, 1],
    [0, 1]
  ]
];
