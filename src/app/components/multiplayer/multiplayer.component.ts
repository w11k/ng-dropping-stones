import { Component, OnInit } from '@angular/core';
import { Init } from '../../store/actions/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Keymap } from '../../model/keymap.model';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
})
export class MultiplayerComponent implements OnInit {

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

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new Init(2));
  }

}
