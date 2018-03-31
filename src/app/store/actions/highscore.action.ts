import {Action} from '@ngrx/store';
import {Score} from '../../models/highscore/highscore.model';

export const SAVE_HIGHSCORE = 'SAVE_HIGHSCORE';
export const UPDATE_HIGHSCORE = 'UPDATE_HIGHSCORE';
export const DELETE_HIGHSCORE = 'DELETE_HIGHSCORE';

export class SaveHighscore implements Action {
  readonly type = SAVE_HIGHSCORE;
  constructor(public payload: Score) {}
}

export class UpdateHighscore implements Action {
  readonly type = UPDATE_HIGHSCORE;
  constructor(public payload: Score) {}
}

export class DeleteHighscore implements Action {
  readonly type = DELETE_HIGHSCORE;
}

export type HighscoreAction =
  SaveHighscore | UpdateHighscore | DeleteHighscore;

