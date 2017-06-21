import {Tretromino} from "./tetromino.model";
import {TretrominoType} from "../../game.constants";
export class LTretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX, TretrominoType.LTYPE);
  }
}

const ROTATIONS_MATRIX = [
  [[0,0,1],
    [1,1,1]],
  [[1,1],
    [0,1],
    [0,1]],
  [[1,1,1],
    [1,0,0]],
  [[1,0],
    [1,0],
    [1,1]],
];
