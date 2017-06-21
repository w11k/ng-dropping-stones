import {Tretromino} from "./tetromino.model";
import {TretrominoType} from "../../game.constants";
export class ITretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX, TretrominoType.ITYPE);
  }
}

const ROTATIONS_MATRIX = [
  [[1,1,1,1]],
  [[1],
    [1],
    [1],
    [1]]
];
