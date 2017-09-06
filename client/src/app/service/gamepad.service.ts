import {Injectable} from '@angular/core';
import {InputEvents} from './game.constants';
import {GameService} from './game.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';

@Injectable()
export class GamepadService {
  gamepad_count = 2;     // number of available gamepads
  axisInputThrottle = 100; // time in ms before a second click will be applied
  buttonInputThrottle = 200;

  private buttonInputSubject = new Subject();
  private axisInputSubject = new Subject();

  constructor(private gameService: GameService) {
    this.subscribeToInput();
  }

  // walk through all buttons and joysticks of all gamepads to check for new input
  public pollGamepads() {
    const gamepads = navigator.getGamepads();
    if (gamepads[0] && gamepads[1]) {

      for (let i = 0; i < this.gamepad_count; i++) {

        for (let k = 0; k < gamepads[i].buttons.length; k++) {
          if (gamepads[i].buttons[k].pressed) {
            this.buttonInputSubject.next(k);
          }
        }

        for (let l = 0; l < gamepads[i].axes.length; l++) {
          if (gamepads[i].axes[l] !== 0) {
            this.axisInputSubject.next({axis: l, value: gamepads[i].axes[l]});
          }
        }
      }
    }
  }

  subscribeToInput() {
    const buttonInputSubscription = this.buttonInputSubject
      .asObservable()
      .throttleTime(this.buttonInputThrottle)
      .subscribe(
        (x: any) => {
          this.mapButtonInput(x);
        });

    const buttonAxisSubscription = this.axisInputSubject
      .asObservable()
      .throttleTime(this.axisInputThrottle)
      .subscribe(
        (x: any) => {
          this.mapAxisInput(x.axis, x.value);
        });

  }

  handleKeyboardInput($event) {
    switch ($event.code) {
      case 'ArrowLeft':
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.LEFT);
        break;
      case 'ArrowRight':
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.RIGHT);
        break;
      case 'ArrowUp':
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.ROTATE_COUNTER_CLOCKWISE);
        break;
      case 'ArrowDown':
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.ROTATE_CLOCKWISE);
        break;
      case 'Space':
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.DROPDOWN);
        break;
      case 'Escape':
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.NEWGAME);
        break;
      default:
    }
  }

  private mapButtonInput(button) {
    switch (button) {
      case 7:
        this.gameService.handleUserMoveEvent(InputEvents.NEWGAME);
        break;
      case 6:
        this.gameService.handleUserMoveEvent(InputEvents.SHOWHIGHSCORE);
        break;
      case 5:
        this.gameService.handleUserMoveEvent(InputEvents.DROPDOWN);
        break;
      case 1:
        this.gameService.handleUserMoveEvent(InputEvents.ROTATE_COUNTER_CLOCKWISE);
        break;
      case 0:
        this.gameService.handleUserMoveEvent(InputEvents.ROTATE_CLOCKWISE);
        break;
      default:
    }

  }

  private mapAxisInput(axis, value) {
    if (axis === 0) { // x-axis
      value === 1 ? this.gameService.handleUserMoveEvent(InputEvents.RIGHT) : this.gameService.handleUserMoveEvent(InputEvents.LEFT);
    }

    if (axis === 1 && value === 1) { // y-axis
      this.gameService.handleUserMoveEvent(InputEvents.DROP);
    }
  }

  public gamePadAvailable() {
    if (navigator['getGamepads']) {
      const gamepads = navigator.getGamepads();
      return !!(gamepads[0] && gamepads[1]);
    } else {
      return false;
    }
  }
}
