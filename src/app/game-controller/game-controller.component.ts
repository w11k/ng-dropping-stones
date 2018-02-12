import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/state.model';
import { DROP, INIT, LEFT, RIGHT, ROTATE, TICK } from '../store/actions/actions';
import { interval } from 'rxjs/observable/interval';
import { Status, Tetris } from '../game-logic/tetris/tetris.model';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.scss']
})
export class GameControllerComponent implements OnInit {

  @Input() player: number;
  game: Tetris;

  constructor(private store: Store<AppState>) {
  }

  controls(e: KeyboardEvent) {

    if (this.game.status === Status.GAME_OVER) {
      return;
    }

    switch (e.code) {
      case 'ArrowLeft':
        this.store.dispatch({type: LEFT});
        break;

      case 'ArrowRight':
        this.store.dispatch({type: RIGHT});
        break;

      case 'ArrowUp':
        this.store.dispatch({type: ROTATE});
        break;

      case 'ArrowDown':
        this.store.dispatch({type: TICK});
        break;

      case 'Space':
        this.store.dispatch({type: DROP});
        break;

      default:
        break;
    }
  }

  ngOnInit() {

    this.store.dispatch({type: INIT});

    this.store.pipe(
      select('game')
    ).subscribe(game => {
      this.game = game as Tetris;
    });

    const tickSubscription = interval(200).subscribe(() => {
      if (this.game.status === Status.PLAYING) {
        this.store.dispatch({type: TICK});
      } else {
        tickSubscription.unsubscribe();
        // GAME OVER LOGIC
        // this.store.dispatch({ type: INIT });
      }
    });
  }

}
