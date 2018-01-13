import { Action } from '@ngrx/store';
import { Tetris } from '../game-logic/tetris/tetris.model';
import { defaultState } from '../game-logic/tetris/tetris';

export const INIT = 'INIT';

export function tetrisReducer (state: Tetris = defaultState, action: Action) {

  switch (action.type) {
    case INIT:
      
      break;
  
    default:
      return state;
  }

};