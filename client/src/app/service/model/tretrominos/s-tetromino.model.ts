import {Tretromino} from "./tetromino.model";
import {TretrominoType} from "../../game.constants";
export class STretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX, TretrominoType.STYPE);
  }
}

const ROTATIONS_MATRIX = [
  [[0,1,1],
    [1,1,0]],
  [[1,0],
    [1,1],
    [0,1]]
];
