import {Score} from '../../models/highscore/highscore.model';
import * as fromActions from '../actions';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

/*
  TODO:
    - Player needs ID
    - Save player to store
    - Player is saved to localStorage via an action
 */

export interface PlayerState {
  players: Array<Score>;
}

export const initialState: PlayerState = {
  players: [
    // MOCK DATA
    // { name: 'test', email: 'test@test.de', score: 111, date: 'Tue Mar 27 2018 11:24:33 GMT+0200 (CEST)' },
    // { name: 'default', email: 'default@test.de', score: 10, date: 'Wed Mar 28 2018 11:24:33 GMT+0200 (CEST)' }
  ],
};

export function playerReducer(
  state: PlayerState = initialState,
  action: fromActions.HighscoreAction): PlayerState {
  switch (action.type) {
    case fromActions.SAVE_HIGHSCORE: {
      console.log(`*** ${action.type} ***`); // DEBUG
      console.log('action.payload = ', action.payload); // DEBUG
      const updatedState = {
        players: [
          ...state.players,
          action.payload
        ]
      };
      console.log('updatedState = ', updatedState); // DEBUG
      return updatedState;
    }
    case fromActions.UPDATE_HIGHSCORE: {
      console.log(`*** ${action.type} ***`); // DEBUG
      console.log('action.payload = ', action.payload); // DEBUG
      const statePlayerDeleted = state.players
        .filter(p => p.name !== action.payload.name);
      const updatedState = {
        players: [
          ...statePlayerDeleted,
          action.payload
        ]
      };
      console.log('updatedState = ', updatedState); // DEBUG
      return updatedState;
    }
    case fromActions.DELETE_HIGHSCORE: {
      console.log(`*** ${action.type} ***`); // DEBUG
      console.log('highscreReducer state = ', state); // DEBUG
      console.log('highscreReducer action = ', action); // DEBUG
      const updatedState = { players: [] };
      console.log('updatedState = ', updatedState); // DEBUG
      return updatedState;
    }
  }
  return state;
}

export function getPlayerFromPlayerState(
  playersObservable: Observable<PlayerState>,
  playerName: string
) {
  return playersObservable.pipe(
    map(state => state.players
      .find( e => e.name === playerName)
    )
  );
}
