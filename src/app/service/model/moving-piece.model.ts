import {Style} from "./style.model";
import {GAME_CELL_SIZE, GAME_BOARDER_SIZE} from "../game.constants";
export class MovingPiece {

  private _shape: Array<Array<number>> = [
    [0, 1],
    [0, 1],
    [1, 1]
  ];

  private _col: number = 4;
  private _row: number = 0;

  constructor() {

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

  public calculateStyle(): Style {
    let top = this.row * GAME_CELL_SIZE;
    let left = GAME_BOARDER_SIZE + GAME_CELL_SIZE * this.col;

    return new Style(top, left)
  }
}

export class PotentialPosition {
  constructor(public row: number, public col: number) {}
}
