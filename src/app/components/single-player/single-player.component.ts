import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state.model';
import {Init} from '../../store/actions/actions';
import {Keymap} from '../../models/keymap/keymap.model';
import {Subscription} from 'rxjs/Subscription';
import {AudioService} from '../../services/audio/audio.service';
import {map} from 'rxjs/operators';
import {Status, Tetris} from '../../models/tetris/tetris.model';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {Observable} from 'rxjs/Observable';
import {getCurrentPlayer, PlayerState} from '../../store/reducers/highscore.reducer';
import {UpdateHighscore} from '../../store/actions';
import {Score} from '../../models/highscore/highscore.model';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePlayerComponent implements OnInit, OnDestroy {

  playerOne: Keymap = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    rotate: 'ArrowUp',
    tick: 'ArrowDown',
    drop: 'Space',
  };

  todaysHighscore: number;
  allTimeHighscore: number;

  private currentPlayerScore: Score;
  private playerState$: Observable<PlayerState>;
  private currentPlayerSubscription: Subscription;
  private gameOverSubscription: Subscription;

  constructor(private gameStore: Store<AppState>,
              private playerStore: Store<PlayerState>,
              private audio: AudioService,
              private router: Router,
              private score: LocalStorageService) {
  }

  ngOnInit() {

    const today = this.score.getTodaysScores();
    const all = this.score.getScores();

    this.todaysHighscore = today.length ? Math.max(...today.map(e => e.score)) : 0;
    this.allTimeHighscore = all.length ? Math.max(...all.map(e => e.score)) : 0;

    this.gameStore.dispatch(new Init(1));
    this.audio.play('korobeiniki.wav', true);

    this.playerState$ = this.playerStore
      .first().pipe(
        select('player')
      ) as Observable<PlayerState>;
    this.currentPlayerSubscription =
      getCurrentPlayer(this.playerState$)
        .subscribe(p => this.currentPlayerScore = p);

    this.gameOverSubscription = this.gameStore
      .pipe(
        select('game'),
        map((games: Tetris[]) => games[0]),
      )
      .subscribe(game => {
        if (game.status === Status.GAME_OVER) {
          // GAME OVER LOGIC
          this.playerStore.dispatch(
            new UpdateHighscore({
              ...this.currentPlayerScore, score: game.score
            })
          );
          this.router.navigate(['game-over']);
        }
      });

  }

  ngOnDestroy() {
    this.audio.pause();
    this.gameOverSubscription.unsubscribe();
    this.currentPlayerSubscription.unsubscribe();
  }

}
