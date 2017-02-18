import {GAME_CELL_SIZE, GAME_BOARDER_SIZE} from "../../game.constants";
import {TretrominoPosition} from "../tretromino-position.model";
export class Tretromino {

  private _shape: Array<Array<number>>;
  private rotationMatrix: Array<Array<Array<number>>>;
  private actualRotation: number =0;
  private _col: number = 0;
  private _row: number = 0;

  constructor(rotationMatrix: Array<Array<Array<number>>>) {
    this._shape = rotationMatrix[this.actualRotation];
    this.rotationMatrix = rotationMatrix;
  }

  get shape(): Array<Array<number>> {
    return this._shape;
  }

  get col(): number {
    return this._col;
  }

  get row(): number {
    return this._row;
  }

  set col(value: number) {
    this._col = value;
  }

  set row(value: number) {
    this._row = value;
  }

  public calculateStyle(): TretrominoPosition {
    let top = this.row * GAME_CELL_SIZE;
    let left = GAME_BOARDER_SIZE + GAME_CELL_SIZE * this.col;

    return new TretrominoPosition(top, left)
  }

  public rotateClockwise() {
    this.actualRotation = this.getNextClockwiseRotation();
    this._shape = this.rotationMatrix[this.actualRotation];
  }

  public getPotentialClockwiseShape(): Array<Array<number>> {
    return this.rotationMatrix[this.getNextClockwiseRotation()];
  }

  private getNextClockwiseRotation(): number {
    let newRotation = this.actualRotation;
    if(newRotation + 1  < this.rotationMatrix.length) {
      newRotation++;
    } else {
      newRotation = 0;
    }
    return newRotation;
  }

  public rotateCounterClockwise() {
    this.actualRotation = this.getNextCounterClockwiseRotation();
    this._shape = this.rotationMatrix[this.actualRotation];
  }

  public getPotentialCounterClockwiseShape(): Array<Array<number>> {
    return this.rotationMatrix[this.getNextCounterClockwiseRotation()];
  }

  private getNextCounterClockwiseRotation(): number {
    let newRotation = this.actualRotation;
    if(newRotation - 1  < 0) {
      newRotation = this.rotationMatrix.length -1;
    } else {
      newRotation--;
    }
    return newRotation;
  }
}
