import { Action } from '@ngrx/store';
import { Tetris } from '../game-logic/tetris/tetris.model';
import { tickMapper } from './mappers/tick-mapper';
import { initMapper } from './mappers/init-mapper';
import { TICK, INIT, LEFT, RIGHT } from './actions/actions';
import { leftMapper } from './mappers/left-mapper';
import { rightMapper } from './mappers/right-mapper';

export function tetrisReducer(state: Tetris = null, action: Action) {

  switch (action.type) {
    case TICK:
      return tickMapper(state);

    case INIT:
      return initMapper();

    case LEFT:
      return leftMapper(state);

      case RIGHT:
      return rightMapper(state);

    default:
      return state;
  }

}
