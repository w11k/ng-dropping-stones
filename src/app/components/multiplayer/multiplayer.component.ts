import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Init} from '../../store/actions/actions';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state.model';
import {Keymap} from '../../models/keymap/keymap.model';
import {interval, Observable, Subscription} from 'rxjs';
import {AudioService} from '../../services/audio/audio.service';
import {Router} from '@angular/router';
import {Status, Tetris} from '../../models/tetris/tetris.model';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiplayerComponent implements OnInit, OnDestroy {

  gameOverSubscription: Subscription;
  private ESCSubscription: Subscription;

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
  ready: boolean = false;

  constructor(private store: Store<AppState>,
              private audio: AudioService,
              private router: Router,
              private gamepad: GamepadService) {
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
    this.ESCSubscription = this.gamepad.abortGame();
  }

  ngOnDestroy() {
    this.audio.pause();
    this.gameOverSubscription.unsubscribe();
    this.ESCSubscription.unsubscribe();
  }

}
