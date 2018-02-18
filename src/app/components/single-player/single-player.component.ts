import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Init, Tick } from '../../store/actions/actions';
import { Keymap } from '../../models/keymap/keymap.model';
import { interval } from 'rxjs/observable/interval';
import { Subscription } from 'rxjs/Subscription';
import { AudioService } from '../../services/audio/audio.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Tetris, Status } from '../../models/tetris/tetris.model';
import { Router } from '@angular/router';
import { HighscoreService } from '../../services/highscore/highscore.service';

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

  gameOverSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private audio: AudioService,
    private router: Router,
    private score: HighscoreService
  ) { }

  ngOnInit() {
    this.store.dispatch(new Init(1));
    this.audio.play('korobeiniki.wav', true);

    this.gameOverSubscription = this.store.pipe(
      select('game'),
      map((games: Tetris[]) => games[0]),
    ).subscribe(game => {
      if (game.status === Status.GAME_OVER) {
        // GAME OVER LOGIC
        this.score.setScore(game.score);
        this.router.navigate(['game-over']);
      }
    });

  }

  ngOnDestroy() {
    this.audio.pause();
    this.gameOverSubscription.unsubscribe();
  }

}
