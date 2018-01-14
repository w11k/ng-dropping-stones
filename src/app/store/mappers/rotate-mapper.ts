import { Tetris } from "../../game-logic/tetris/tetris.model";
import * as clone from 'clone';
import { TetrominoHelper } from "../../game-logic/tetromino/tetromino-helper";

export const rotateMapper = (state: Tetris) => {
  const newState = clone(state);
  newState.current.coordinates = TetrominoHelper.rotate(newState.current.coordinates);
  return newState;

}