import {Tretromino} from './tetromino.model';
import {TretrominoType} from '../../game.constants';
export class ZTretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX, TretrominoType.ZTYPE);
  }
}

const ROTATIONS_MATRIX = [
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0]
  ]
];
