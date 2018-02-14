import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Init, Tick } from '../../store/actions/actions';
import { Keymap } from '../../model/keymap.model';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    const gameLoop = interval(200).subscribe(() => {
      this.store.dispatch(new Tick(0));
    });
  }

}
