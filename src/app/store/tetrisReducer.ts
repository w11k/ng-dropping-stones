import { Action } from '@ngrx/store';
import { Tetris } from '../game-logic/tetris/tetris.model';
import { defaultState } from '../game-logic/tetris/settings';
import { tickMapper } from './mappers/tick-mapper';

export const TICK = 'TICK';

export function tetrisReducer (state: Tetris = defaultState, action: Action) {

  switch (action.type) {
    case TICK:
      return tickMapper(state);

    default:
      return state;
  }

}
