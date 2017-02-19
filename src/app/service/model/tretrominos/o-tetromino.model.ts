import {Tretromino} from "./tetromino.model";
export class OTretromino extends Tretromino {
  constructor() {
    super(ROTATIONS_MATRIX);
  }
}

const ROTATIONS_MATRIX = [
  [[1,1],
    [1,1]]
];
