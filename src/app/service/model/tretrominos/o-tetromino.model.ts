import {Tretromino} from "./tetromino.model";
import {TretrominoType} from "../../game.constants";
export class OTretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX, TretrominoType.OTYPE);
  }
}

const ROTATIONS_MATRIX = [
  [[1,1],
    [1,1]]
];
