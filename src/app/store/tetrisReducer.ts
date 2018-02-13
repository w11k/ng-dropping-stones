import { Tetris } from '../model/tetris/tetris.model';
import { tickMapper } from './mappers/tick-mapper';
import { initMapper } from './mappers/init-mapper';
import { TetrisAction, TetrisActionTypes } from './actions/actions';
import { leftMapper } from './mappers/left-mapper';
import { rightMapper } from './mappers/right-mapper';
import { rotateMapper } from './mappers/rotate-mapper';
import { dropMapper } from './mappers/drop-mapper';

export function tetrisReducer(state: Tetris[] = [], action: TetrisAction): Tetris[] {

  switch (action.type) {
    case TetrisActionTypes.TICK:
      return tickMapper(state, action.payload);

    case TetrisActionTypes.INIT:
      return initMapper(action.payload);

    case TetrisActionTypes.LEFT:
      return leftMapper(state, action.payload);

    case TetrisActionTypes.RIGHT:
      return rightMapper(state, action.payload);

    case TetrisActionTypes.ROTATE:
      return rotateMapper(state, action.payload);

    case TetrisActionTypes.DROP:
      return dropMapper(state, action.payload);

    default:
      return state;
  }

}
