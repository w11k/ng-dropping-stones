import { Tetris } from '../game-logic/tetris/tetris.model';
import { tickMapper } from './mappers/tick-mapper';
import { initMapper } from './mappers/init-mapper';
import { TetrisAction, TetrisActionTypes } from './actions/actions';
import { leftMapper } from './mappers/left-mapper';
import { rightMapper } from './mappers/right-mapper';
import { rotateMapper } from './mappers/rotate-mapper';
import { dropMapper } from './mappers/drop-mapper';

export function tetrisReducer(state: Tetris = null, action: TetrisAction): Tetris {

  switch (action.type) {
    case TetrisActionTypes.TICK:
      return tickMapper(state);

    case TetrisActionTypes.INIT:
      return initMapper();

    case TetrisActionTypes.LEFT:
      return leftMapper(state);

    case TetrisActionTypes.RIGHT:
      return rightMapper(state);

    case TetrisActionTypes.ROTATE:
      return rotateMapper(state);

    case TetrisActionTypes.DROP:
      return dropMapper(state);

    default:
      return state;
  }

}
