import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Init } from '../../store/actions/actions';
import { Keymap } from '../../model/keymap.model';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.scss']
})
export class SinglePlayerComponent implements OnInit {

  playerOne: Keymap = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    rotate: 'ArrowUp',
    tick: 'ArrowDown',
    drop: 'Space',
  };

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new Init(1));
    const audio = new Audio();
    audio.src = '/assets/korobeiniki.wav';
    audio.load();
    audio.playbackRate = 1.2;
    audio.play();
  }

}
