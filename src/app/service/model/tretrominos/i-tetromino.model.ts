import {Tretromino} from "./tetromino.model";
export class ITretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX);
  }
}

const ROTATIONS_MATRIX = [
  [[1,1,1,1]],
  [[1],
    [1],
    [1],
    [1]]
];
