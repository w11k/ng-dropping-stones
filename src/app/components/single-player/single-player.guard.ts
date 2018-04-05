import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {select, Store} from '@ngrx/store';
import {getCurrentPlayer, PlayerState} from '../../store/reducers/highscore.reducer';
import {Observable} from 'rxjs/Observable';
import {Score} from '../../models/highscore/highscore.model';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class SinglePlayerGuard implements CanActivate {

  private playerState$: Observable<PlayerState>;
  private currentPlayerSubscription: Subscription;
  private currentPlayerScore: Score;

  constructor(private score: LocalStorageService,
              private playerStore: Store<PlayerState>,
              private router: Router) {
  }

  canActivate(): boolean {

    this.playerState$ = this.playerStore
      .first().pipe(
        select('player')
      ) as Observable<PlayerState>;
    this.currentPlayerSubscription =
      getCurrentPlayer(this.playerState$)
        .first()
        .subscribe(p => this.currentPlayerScore = p);

    const hasName = this.currentPlayerScore.name !== '';
    if (!hasName) {
      this.router.navigate(['enter-name']);
    }
    return hasName;
  }
}
