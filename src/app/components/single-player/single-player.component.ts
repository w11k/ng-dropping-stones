import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Init, Tick } from '../../store/actions/actions';
import { Keymap } from '../../models/keymap/keymap.model';
import { interval } from 'rxjs/observable/interval';
import { Subscription } from 'rxjs/Subscription';
import { AudioService } from '../../services/audio/audio.service';

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

  gameLoop: Subscription;

  constructor(private store: Store<AppState>, private audio: AudioService) {
  }

  ngOnInit() {
    this.store.dispatch(new Init(1));
    this.gameLoop = interval(200).subscribe(() => {
      this.store.dispatch(new Tick(0));
    });
    this.audio.play('korobeiniki.wav', true);
  }

  ngOnDestroy() {
    this.gameLoop.unsubscribe();
    this.audio.pause();
  }

}
