import {Action} from '@ngrx/store';
import {Score} from '../../models/highscore/highscore.model';

export const SAVE_HIGHSCORE = 'SAVE_HIGHSCORE';

export const UPDATE_HIGHSCORE = 'UPDATE_HIGHSCORE';
export const UPDATE_HIGHSCORE_SUCCESS = 'UPDATE_HIGHSCORE_SUCCESS';
export const UPDATE_HIGHSCORE_FAIL = 'UPDATE_HIGHSCORE_FAIL';

export const DELETE_HIGHSCORE = 'DELETE_HIGHSCORE';
export const DELETE_HIGHSCORE_SUCCESS = 'DELETE_HIGHSCORE_SUCCESS';
export const DELETE_HIGHSCORE_FAIL = 'DELETE_HIGHSCORE_FAIL';

export const WRITE_LOCAL_HIGHSCORE = 'WRITE_LOCAL_HIGHSCORE';

export class SaveHighscore implements Action {
  readonly type = SAVE_HIGHSCORE;
  constructor(public payload: Score) {}
}

export class UpdateHighscore implements Action {
  readonly type = UPDATE_HIGHSCORE;
  constructor(public payload: Score) {}
}

export class UpdateHighscoreSuccess implements Action {
  readonly type = UPDATE_HIGHSCORE_SUCCESS;
}

export class UpdateHighscoreFail implements Action {
  readonly type = UPDATE_HIGHSCORE_FAIL;
}

export class DeleteHighscore implements Action {
  readonly type = DELETE_HIGHSCORE;
}

export class DeleteHighscoreSuccess implements Action {
  readonly type = DELETE_HIGHSCORE_SUCCESS;
}

export class DeleteHighscoreFail implements Action {
  readonly type = DELETE_HIGHSCORE_FAIL;
}

export class WriteLocalHighscore implements Action {
  readonly type = WRITE_LOCAL_HIGHSCORE;
}

export type HighscoreAction =
    SaveHighscore
  | UpdateHighscore
  | UpdateHighscoreSuccess
  | UpdateHighscoreFail
  | DeleteHighscore
  | DeleteHighscoreSuccess
  | DeleteHighscoreFail
  | WriteLocalHighscore;
