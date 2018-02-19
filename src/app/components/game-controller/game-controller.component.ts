import { ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Tetris } from '../../models/tetris/tetris.model';
import { Drop, Left, Right, Rotate, Tick } from '../../store/actions/actions';
import { Keymap } from '../../models/keymap/keymap.model';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GamepadService } from '../../services/gamepad/gamepad.service';
import { GamepadActions } from '../../models/gamepad/gamepad.model';
import { Subscription } from 'rxjs/Subscription';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameControllerComponent implements OnInit, OnDestroy {

  @Input() player: number;
  @Input() controller: number;
  @Input() keymap: Keymap;
  game$: Observable<Tetris>;
  isMultiplayer: boolean;
  difference: number;
  gameLoop$: Observable<number>;
  gameLevel$: Observable<number>;

  gamepadSubscription: Subscription;
  gameLoopSubscription: Subscription;

  constructor(private store: Store<AppState>, private gamepad: GamepadService) {
  }

  @HostListener('document:keydown', ['$event'])
  controls(e: KeyboardEvent) {

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
      select('game'),
      tap((games: Tetris[]) => this.isMultiplayer = games.length > 1),
      tap((games: Tetris[]) => {
        if (!this.isMultiplayer) {
          return;
        }
        const scores = games.map(game => game.score);
        const myScore = scores.splice(this.player, 1)[0];
        this.difference = myScore - Math.max(...scores);
      }),
      map((games: Tetris[]) => games[this.player])
    )
    ;

    this.gameLevel$ = this.game$.pipe(
      map(game => Math.floor(game.rowsCleared / 10)),
      distinctUntilChanged()
    );

    this.gameLoop$ = this.gameLevel$.pipe(
      switchMap(level => interval(200 - level * 20))
    );

    this.gameLoopSubscription = this.gameLoop$.subscribe(() => {
      this.store.dispatch(new Tick(this.player));
    });

    this.gamepadSubscription = this.gamepad.getActions(this.controller).subscribe(action => {
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
    this.gameLoopSubscription.unsubscribe();
  }

}
