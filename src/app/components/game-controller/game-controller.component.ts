import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { interval } from 'rxjs/observable/interval';
import { Status, Tetris } from '../../model/tetris/tetris.model';
import { Drop, Left, Right, Rotate, Tick } from '../../store/actions/actions';
import { Keymap } from '../../model/keymap.model';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.scss']
})
export class GameControllerComponent implements OnInit {

  @Input() player: number;
  @Input() keymap: Keymap;
  game: Tetris;

  constructor(private store: Store<AppState>) {
  }

  controls(e: KeyboardEvent) {

    if (this.game.status === Status.GAME_OVER) {
      return;
    }

    switch (e.code) {
      case this.keymap.left:
        this.store.dispatch(new Left(this.player));
        break;

      case this.keymap.right:
        this.store.dispatch(new Right(this.player));
        break;

      case this.keymap.rotate:
        this.store.dispatch(new Rotate(this.player));
        break;

      case this.keymap.tick:
        this.store.dispatch(new Tick(this.player));
        break;

      case this.keymap.drop:
        this.store.dispatch(new Drop(this.player));
        break;

      default:
        break;
    }
  }

  ngOnInit() {

    this.store.pipe(
      select('game')
    ).subscribe(game => {
      this.game = game[this.player] as Tetris;
    });

    const tickSubscription = interval(200).subscribe(() => {
      if (this.game.status === Status.PLAYING) {
        this.store.dispatch(new Tick(this.player));
      } else {
        tickSubscription.unsubscribe();
        // GAME OVER LOGIC
        // this.store.dispatch({ type: INIT });
      }
    });
  }

}
