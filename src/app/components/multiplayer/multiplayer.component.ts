import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Init } from '../../store/actions/actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Keymap } from '../../models/keymap/keymap.model';
import { Subscription } from 'rxjs/Subscription';
import { AudioService } from '../../services/audio/audio.service';
import { Router } from '@angular/router';
import { Status, Tetris } from '../../models/tetris/tetris.model';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiplayerComponent implements OnInit, OnDestroy {

  gameOverSubscription: Subscription;

  playerOne: Keymap = {
    left: 'KeyA',
    right: 'KeyD',
    rotate: 'KeyW',
    tick: 'KeyS',
    drop: 'KeyE',
  };

  playerTwo: Keymap = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    rotate: 'ArrowUp',
    tick: 'ArrowDown',
    drop: 'Space',
  };

  constructor(private store: Store<AppState>, private audio: AudioService, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(new Init(2));
    this.audio.play('SugarplumFairy.wav', true);

    this.gameOverSubscription = this.store.pipe(
      select('game'),
    ).subscribe((games: Tetris[]) => {
      if (games.every(game => game.status === Status.GAME_OVER)) {
        this.router.navigate(['multi-game-over']);
      }
    });
  }

  ngOnDestroy() {
    this.audio.pause();
    this.gameOverSubscription.unsubscribe();
  }
}
