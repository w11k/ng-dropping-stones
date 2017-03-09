import {Tretromino} from "./tetromino.model";
import {TretrominoType} from "../../game.constants";
export class JTretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX, TretrominoType.JTYPE);
  }
}

const ROTATIONS_MATRIX = [
  [[1,0,0],
    [1,1,1]],
  [[1,1],
    [1,0],
    [1,0]],
  [[1,1,1],
    [0,0,1]],
  [[0,1],
    [0,1],
    [1,1]],
];
