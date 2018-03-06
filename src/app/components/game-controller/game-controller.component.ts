import {ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state.model';
import {Tetris} from '../../models/tetris/tetris.model';
import {Drop, Left, Right, RotateLeft, RotateRight, Tick} from '../../store/actions/actions';
import {Keymap} from '../../models/keymap/keymap.model';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {Subscription} from 'rxjs/Subscription';
import {interval} from 'rxjs/observable/interval';

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

  gameSpeed = 4;

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
        this.store.dispatch(new RotateRight(this.player));
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

    this.store.select((state: AppState) => state.settings.speed).subscribe(speed => {
      this.gameSpeed = speed;
    });

    this.game$ = this.store.pipe(
      select((state: AppState) => state.game),
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
    );

    this.gameLevel$ = this.game$.pipe(
      map(game => Math.floor(game.rowsCleared / 10)),
      distinctUntilChanged()
    );

    this.gameLoop$ = this.gameLevel$.pipe(
      switchMap(level => {
        const modifier = level + this.gameSpeed;
        const initialMoveInterval = 200;
        const newSpeed = (initialMoveInterval / 100) * ((10 - modifier) * 10);
        return interval(Math.max(newSpeed, 40));
      })
    );

    this.gameLoopSubscription = this.gameLoop$.subscribe(() => {
      this.store.dispatch(new Tick(this.player));
    });

    this.gamepadSubscription = this.gamepad.getActions(this.controller).subscribe(action => {
      switch (action) {
        case GamepadActions.LEFT:
          this.store.dispatch(new Left(this.player));
          break;

        case GamepadActions.RIGHT:
          this.store.dispatch(new Right(this.player));
          break;

        case GamepadActions.ROTATE_RIGHT:
          this.store.dispatch(new RotateRight(this.player));
          break;

        case GamepadActions.ROTATE_LEFT:
          this.store.dispatch(new RotateLeft(this.player));
          break;

        case GamepadActions.DOWN:
          this.store.dispatch(new Tick(this.player));
          break;

        case GamepadActions.DROP:
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
