import {Score} from '../../models/highscore/highscore.model';
import * as fromActions from '../actions';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

export interface PlayerState {
  currentPlayer: Score;
  players: Array<Score>;
}

export const initialState: PlayerState = {
  currentPlayer: { name: '', email: '', score: 0, date: '' },
  players: []
};

export function playerReducer(
  state: PlayerState = initialState,
  action: fromActions.HighscoreAction): PlayerState {
  switch (action.type) {
    case fromActions.SAVE_HIGHSCORE: {
      // console.log(`*** ${action.type} ***`); // DEBUG
      // console.log('action.payload = ', action.payload); // DEBUG
      const updatedState = {
        ...state,
        currentPlayer: action.payload
      };
      // console.log('updatedState = ', updatedState); // DEBUG
      return updatedState;
    }
    case fromActions.UPDATE_HIGHSCORE: {
      // console.log(`*** ${action.type} ***`); // DEBUG
      // console.log('action.payload = ', action.payload); // DEBUG
      const updatedState = {
        ...state,
        currentPlayer: action.payload
      };
      // console.log('updatedState = ', updatedState); // DEBUG
      return updatedState;
    }
    case fromActions.WRITE_LOCAL_HIGHSCORE: {
      // console.log(`*** ${action.type} ***`); // DEBUG
      const savedPlayers = JSON.parse(localStorage.getItem('highscore'));
      const updatedState = {
        ...state,
        players: savedPlayers
      };
      // console.log('updatedState = ', updatedState); // DEBUG
      return updatedState;
    }
    case fromActions.DELETE_HIGHSCORE: {
      // console.log(`*** ${action.type} ***`); // DEBUG
      const updatedState = {
        ...state,
        players: []
      };
      // console.log('updatedState = ', updatedState); // DEBUG
      return updatedState;
    }
  }
  return state;
}

export const getCurrentPlayer =
  (playersObservable: Observable<PlayerState>) =>
    playersObservable
      .pipe(
        map(state => state.currentPlayer)
      );

// export const getPlayers =
//   (playersObservable: Observable<PlayerState>) =>
//     playersObservable
//       .pipe(
//         map(state => state.players)
//       );
