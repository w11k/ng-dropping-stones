import {MovingPiece} from "./moving-piece.model";
export class BlockPiece extends MovingPiece {
  constructor() {
    super(ROTATIONS_MATRIX);
  }
}

const ROTATIONS_MATRIX = [
  [[1,1],
    [1,1]]
];
