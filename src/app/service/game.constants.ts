export const GAME_CELL_SIZE: number = 25;
export const GAME_BOARDER_SIZE: number = 10;
export enum MoveEvents {
  ROTATE_COUNTER_CLOCKWISE,
  ROTATE_CLOCKWISE,
  LEFT,
  RIGHT,
  DROP
}

export enum TretrominoType {
  OTYPE = 1,
  ITYPE = 2,
  JTYPE = 3,
  LTYPE = 4,
  STYPE = 5,
  TTYPE = 6,
  ZTYPE = 7,
}
