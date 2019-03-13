import {first, map, startWith, switchMap} from 'rxjs/operators';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state.model';
import {Init} from '../../store/actions';
import {Keymap} from '../../models/keymap/keymap.model';
import {interval, Observable, Subscription, timer} from 'rxjs';
import {AudioService} from '../../services/audio/audio.service';
import {Status, Tetris} from '../../models/tetris/tetris.model';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {getCurrentPlayer, PlayerState} from '../../store/reducers/highscore.reducer';
import {UpdateHighscore} from '../../store/actions';
import {Score} from '../../models/highscore/highscore.model';
import {GamepadService} from '../../services/gamepad/gamepad.service';

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

  counter: number;
  countdown$: Observable<number>;

  todaysHighscore: number;
  allTimeHighscore: number;

  private currentPlayerScore: Score;
  private playerState$: Observable<PlayerState>;
  private currentPlayerSubscription: Subscription;
  private gameOverSubscription: Subscription;
  private ESCSubscription: Subscription;
  ready: boolean = false;

  constructor(private gameStore: Store<AppState>,
              private playerStore: Store<PlayerState>,
              private audio: AudioService,
              private router: Router,
              private score: LocalStorageService,
              private gamepad: GamepadService) {
  }

  ngOnInit() {
    this.counter = 3;
    this.simulateCountdown();

    this.todaysHighscore = this.score.getTodayHighestScore();
    this.allTimeHighscore = this.score.getContestHighestScore();

    this.gameStore.dispatch(new Init(1));
    this.audio.play('korobeiniki.wav', true);

    this.playerState$ = this.playerStore.pipe(
      first()).pipe(
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

    this.ESCSubscription = this.gamepad.abortGame();
  }

  ngOnDestroy() {
    this.audio.pause();
    this.gameOverSubscription.unsubscribe();
    this.currentPlayerSubscription.unsubscribe();
    this.ESCSubscription.unsubscribe();
  }

  simulateCountdown(): void {
    if (this.counter > 0) {
      this.countdown$ = interval(1000).pipe(map(() => --this.counter), startWith(3));
    }
  }
}
