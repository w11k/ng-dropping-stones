import { Tetris, Status } from "./tetris.model";

const board = new Array(15).fill(
  new Array(10).fill(null)
);

export const defaultState: Tetris = {
  status: Status.GAME_OVER,
  board,
  current: null
};