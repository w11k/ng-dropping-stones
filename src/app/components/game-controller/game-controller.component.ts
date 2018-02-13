import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { interval } from 'rxjs/observable/interval';
import { Status, Tetris } from '../../model/tetris/tetris.model';
import { Drop, Left, Right, Rotate, Tick } from '../../store/actions/actions';

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
        this.store.dispatch(new Left(this.player));
        break;

      case 'ArrowRight':
        this.store.dispatch(new Right(this.player));
        break;

      case 'ArrowUp':
        this.store.dispatch(new Rotate(this.player));
        break;

      case 'ArrowDown':
        this.store.dispatch(new Tick(this.player));
        break;

      case 'Space':
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
