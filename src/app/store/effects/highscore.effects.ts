import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import * as fromActions from '../actions';
import {catchError, map, startWith, tap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {UpdateHighscore} from '../actions/highscore.action';
import {PlayerState} from '../reducers/highscore.reducer';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class HighscoreEffects {

  constructor(private actions$: Actions,
              private router: Router,
              private playerStore: Store<PlayerState>,
              private highscoreService: LocalStorageService) {
  }

  @Effect({ dispatch: false }) saveHighscore$: Observable<Action> =
    this.actions$.pipe(
      ofType(fromActions.SAVE_HIGHSCORE),
      tap(() => this.router.navigate(['single']))
    );

  @Effect() updateHighscore$: Observable<Action> =
    this.actions$
      .ofType(fromActions.UPDATE_HIGHSCORE)
      .pipe(
        map((action: UpdateHighscore) => this.highscoreService.writeLocalHighscore(action.payload)),
        map(() => new fromActions.UpdateHighscoreSuccess()),
        catchError(() => of(new fromActions.UpdateHighscoreFail()))
      );

  @Effect() deleteHighscore$: Observable<Action> =
    this.actions$
    .ofType(fromActions.DELETE_HIGHSCORE)
    .pipe(
      map(() => this.highscoreService.deleteLocalHighscore()),
      map(() => new fromActions.DeleteHighscoreSuccess()),
      catchError(() => of(new fromActions.DeleteHighscoreFail()))
    );


}
