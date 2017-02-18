import {MovingPiece} from "./moving-piece.model";
export class LPiece extends MovingPiece {
  constructor() {
    super(ROTATIONS_MATRIX);
  }
}

const ROTATIONS_MATRIX = [
  [[0,1],
    [0,1],
    [1,1]],
  [[1,0,0],
    [1,1,1]],
  [[1,1],
    [1,0],
    [1,0]],
  [[1,1,1],
    [0,0,1]]
];
