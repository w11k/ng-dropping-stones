import {Injectable, OnInit} from '@angular/core';
import {InputEvents} from "./game.constants";
import {GameService} from "./game.service";
import {Subject} from "rxjs";

@Injectable()
export class GamepadService {
  gamepad_count: number = 2;     // number of available gamepads
  axisInputThrottle: number = 100; // time in ms before a second click will be applied
  buttonInputThrottle: number = 100;

  private buttonInputSubject = new Subject();
  private axisInputSubject = new Subject();

  constructor(private gameService: GameService) {
    this.subscribeToInput();
  }

  // walk through all buttons and joysticks of all gamepads to check for new input
  public pollGamepads() {
    var gamepads = navigator.getGamepads();
    if (gamepads[0] && gamepads[1]) {

      for (var i = 0; i < this.gamepad_count; i++) {

        for (var k = 0; k < gamepads[i].buttons.length; k++) {
          if (gamepads[i].buttons[k].pressed) {
            this.buttonInputSubject.next(k);
          }
        }

        for (var l = 0; l < gamepads[i].axes.length; l++) {
          if (gamepads[i].axes[l] !== 0) {
            this.axisInputSubject.next({axis: l, value: gamepads[i].axes[l]});
          }
        }
      }
    }
  }

  subscribeToInput() {
    let buttonInputSubscription = this.buttonInputSubject
      .asObservable()
      .throttleTime(this.buttonInputThrottle)
      .subscribe(
        (x: any) => {
          this.mapButtonInput(x);
          // console.log('Next: ' + x);
        });

    let buttonAxisSubscription = this.axisInputSubject
      .asObservable()
      .throttleTime(this.axisInputThrottle)
      .subscribe(
        (x: any) => {
          this.mapAxisInput(x.axis, x.value);
          // console.log('Next: ' + x.axis + ' ' + x.value);
        });

  }

  handleKeyboardInput($event) {
    // console.log($event.code);
    switch ($event.code) {
      case "ArrowLeft":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.LEFT);
        break;
      case "ArrowRight":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.RIGHT);
        break;
      case "ArrowUp":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.ROTATE_COUNTER_CLOCKWISE);
        break;
      case "ArrowDown":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.ROTATE_CLOCKWISE);
        break;
      case "Space":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(InputEvents.DROPDOWN);
        break;
      case "Escape":
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
      value === 1 ? this.gameService.handleUserMoveEvent(InputEvents.RIGHT) : this.gameService.handleUserMoveEvent(InputEvents.LEFT)
    }

    if (axis === 1 && value === 1) { // y-axis
      this.gameService.handleUserMoveEvent(InputEvents.DROP)
    }
  }

  public gamePadAvailable() {
    if (navigator['getGamepads']) {
      let gamepads = navigator.getGamepads();
      return !!(gamepads[0] && gamepads[1])
    } else {
      return false
    }
  }
}
