import {Score} from '../../models/highscore/highscore.model';
import * as fromActions from '../actions';
import {Observable} from 'rxjs';
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
      const updatedState = {
        ...state,
        currentPlayer: action.payload
      };
      return updatedState;
    }
    case fromActions.UPDATE_HIGHSCORE: {
      const updatedState = {
        ...state,
        currentPlayer: action.payload
      };
      return updatedState;
    }
    case fromActions.WRITE_LOCAL_HIGHSCORE: {
      const savedPlayers = JSON.parse(localStorage.getItem('highscore'));
      const updatedState = {
        ...state,
        players: savedPlayers
      };
      return updatedState;
    }
    case fromActions.DELETE_HIGHSCORE: {
      const updatedState = {
        ...state,
        players: []
      };
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
