import { Tetris } from '../../models/tetris/tetris.model';
import * as clone from 'clone';
import { rotate } from '../../helpers/tetromino-helpers';
import { collision, rotateCollision } from '../../helpers/store-helpers';

export const rotateRightMapper = (state: Tetris[], index: number) => rotateMapper(state, index, true);
export const rotateLeftMapper = (state: Tetris[], index: number) => rotateMapper(state, index, false);

const rotateMapper = (state: Tetris[], index: number, right: boolean): Tetris[] => {
  const newState = clone<Tetris[]>(state, false);
  const game = newState[index];
  if (game.current === null) {
    return state;
  }

  if (right) {
    game.current.coordinates = rotate(game.current.coordinates);
  } else {
    game.current.coordinates = rotate(game.current.coordinates, 3);
  }

  while (collision(game.board, game.current).right) {
    game.current.offset.x -= 1;
  }
  while (collision(game.board, game.current).left) {
    game.current.offset.x += 1;
  }
  if (rotateCollision(game.board, game.current)) {
    return state;
  } else {
    return newState;
  }
};
