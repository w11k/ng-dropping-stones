export const GAME_CELL_SIZE: number = 25;
export const GAME_BOARDER_SIZE: number = 10;
export let INC_LEVEL_PER_LINE: number = 10; // increase level every X lines
export let GAME_SPEED_MODIFIER: number = 1;  // game speed
export enum InputEvents {
  ROTATE_COUNTER_CLOCKWISE,
  ROTATE_CLOCKWISE,
  LEFT,
  RIGHT,
  DROP,
  DROPDOWN,

  NEWGAME,
  SHOWHIGHSCORE
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
