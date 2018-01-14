import { Action } from '@ngrx/store';
import { Tetris } from '../game-logic/tetris/tetris.model';
import { tickMapper } from './mappers/tick-mapper';
import { initMapper } from './mappers/init-mapper';
import { TICK, INIT } from './actions/actions';

export function tetrisReducer(state: Tetris = null, action: Action) {

  switch (action.type) {
    case TICK:
      return tickMapper(state);

    case INIT:
      return initMapper();

    default:
      return state;
  }

}
