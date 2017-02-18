import {Tretromino} from "./tetromino.model";
export class LTretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX);
  }
}

const ROTATIONS_MATRIX = [
  [[1,0],
    [1,0],
    [1,1]],
  [[0,0,1],
    [1,1,1]],
  [[1,1],
    [0,1],
    [0,1]],
  [[1,1,1],
    [1,0,0]]
];
