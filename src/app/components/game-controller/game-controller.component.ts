import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Status, Tetris } from '../../model/tetris/tetris.model';
import { Drop, Left, Right, Rotate, Tick } from '../../store/actions/actions';
import { Keymap } from '../../model/keymap.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameControllerComponent implements OnInit {

  @Input() player: number;
  @Input() keymap: Keymap;
  game: Tetris;
  game$: Observable<Tetris>;

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
    this.game$ = this.store.pipe(
      select('game')
    ).pipe(
      map(game => game[this.player]),
      tap(game => this.game = game),
    );
  }

}
