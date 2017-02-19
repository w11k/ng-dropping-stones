import {Tretromino} from "./tetromino.model";
export class STretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX);
  }
}

const ROTATIONS_MATRIX = [
  [[0,1,1],
    [1,1,0]],
  [[1,0],
    [1,1],
    [0,1]]
];