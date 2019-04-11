
import {first} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getCurrentPlayer, PlayerState} from '../../store/reducers/highscore.reducer';
import {Observable, Subscription} from 'rxjs';
import {Score} from '../../models/highscore/highscore.model';

@Injectable()
export class SinglePlayerGuard implements CanActivate {

  private playerState$: Observable<PlayerState>;
  private currentPlayerSubscription: Subscription;
  private currentPlayerScore: Score;

  constructor(private playerStore: Store<PlayerState>,
              private router: Router) {
  }

  canActivate(): boolean {

    this.playerState$ = this.playerStore.pipe(
      first()).pipe(
        select('player')
      ) as Observable<PlayerState>;
    this.currentPlayerSubscription =
      getCurrentPlayer(this.playerState$).pipe(
        first())
        .subscribe(p => this.currentPlayerScore = p);

    const hasName = this.currentPlayerScore.name !== '';
    if (!hasName) {
      this.router.navigate(['enter-name']);
    }
    return hasName;
  }
}
