import { ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Status, Tetris } from '../../models/tetris/tetris.model';
import { Drop, Left, Right, Rotate, Tick } from '../../store/actions/actions';
import { Keymap } from '../../models/keymap/keymap.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GamepadService } from '../../services/gamepad/gamepad.service';
import { GamepadActions } from '../../models/gamepad/gamepad.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameControllerComponent implements OnInit, OnDestroy {

  @Input() player: number;
  @Input() keymap: Keymap;
  game: Tetris;
  game$: Observable<Tetris>;
  gamepadSubscription: Subscription;

  constructor(private store: Store<AppState>, private gamepad: GamepadService) {
  }

  @HostListener('document:keydown', ['$event'])
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
    this.gamepadSubscription = this.gamepad.getActions(this.player + 1).subscribe(action => {
      switch (action) {
        case GamepadActions.Left:
          this.store.dispatch(new Left(this.player));
          break;

        case GamepadActions.Right:
          this.store.dispatch(new Right(this.player));
          break;

        case GamepadActions.Rotate:
          this.store.dispatch(new Rotate(this.player));
          break;

        case GamepadActions.Down:
          this.store.dispatch(new Tick(this.player));
          break;

        case GamepadActions.Drop:
          this.store.dispatch(new Drop(this.player));
          break;

        default:
          break;
      }
    });
  }

  ngOnDestroy() {
    this.gamepadSubscription.unsubscribe();
  }

}
