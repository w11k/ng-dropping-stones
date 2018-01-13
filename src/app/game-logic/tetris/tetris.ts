import { Tetris, Status } from "./tetris.model";
import { tetromino } from "../tetromino/tetromino";

const board = new Array(15).fill(
  new Array(10).fill(null)
);

export const defaultState: Tetris = {
  status: Status.PLAYING,
  board,
  current: tetromino.getRandom({x: 4, y: -2})
};