import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import * as fromActions from '../actions';
import {catchError, map, tap} from 'rxjs/operators';
import {UpdateHighscore} from '../actions';
import {PlayerState} from '../reducers/highscore.reducer';
import {Router} from '@angular/router';


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
      .pipe(
        ofType(fromActions.UPDATE_HIGHSCORE),
        map((action: UpdateHighscore) => this.highscoreService.writeLocalHighscore(action.payload)),
        map(() => new fromActions.UpdateHighscoreSuccess()),
        catchError(() => of(new fromActions.UpdateHighscoreFail()))
      );

  @Effect() deleteHighscore$: Observable<Action> =
    this.actions$
    .pipe(
      ofType(fromActions.DELETE_HIGHSCORE),
      map(() => this.highscoreService.deleteLocalHighscore()),
      map(() => new fromActions.DeleteHighscoreSuccess()),
      catchError(() => of(new fromActions.DeleteHighscoreFail()))
    );


}
