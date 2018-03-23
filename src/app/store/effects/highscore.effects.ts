import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HighscoreService} from '../../services/highscore/highscore.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {SettingActionTypes} from '../settingsReducer';
import {tap} from 'rxjs/operators';

@Injectable()
export class HighscoreEffects {
  @Effect({ dispatch: false }) deleteHighscore$: Observable<Action> = this.actions$.pipe(
    ofType(SettingActionTypes.DeleteHighscore),
    tap(() => this.highscoreService.deleteHighscore())
  );

  constructor(private actions$: Actions, private highscoreService: HighscoreService) {
  }
}
