import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Init, Tick } from '../../store/actions/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Keymap } from '../../model/keymap.model';
import { interval } from 'rxjs/observable/interval';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiplayerComponent implements OnInit, OnDestroy {

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

  gameLoop: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new Init(2));
    this.gameLoop = interval(200).subscribe(() => {
      this.store.dispatch(new Tick(0));
      this.store.dispatch(new Tick(1));
    });
  }

  ngOnDestroy() {
    this.gameLoop.unsubscribe();
  }

}
