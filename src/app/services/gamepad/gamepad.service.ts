import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GamepadActions, TetrisGamepad } from '../../models/gamepad/gamepad.model';
import { Observable } from 'rxjs/Observable';
import { filter, map, merge, throttleTime } from 'rxjs/operators';

@Injectable()
export class GamepadService {

  private gamepads: Gamepad[];
  private buttonSubject = new Subject<TetrisGamepad>();
  private axisSubject = new Subject<TetrisGamepad>();
  private buttonMap: { [key: number]: GamepadActions } = {
    0: GamepadActions.Rotate,
    5: GamepadActions.Drop
  };

  constructor() {
    this.pollingLoop();
  }

  getActions(index: number): Observable<GamepadActions> {
    const axes = this.axisSubject.asObservable().pipe(
      filter(gamepad => gamepad.index === index),
      throttleTime(150)
    );
    const buttons = this.buttonSubject.asObservable().pipe(
      filter(gamepad => gamepad.index === index),
      throttleTime(150)
    );
    return axes.pipe(
      merge(buttons),
      map(gamepad => gamepad.action)
    );
  }

  private pollingLoop() {
    window.requestAnimationFrame(() => {
      this.gamepads = navigator.getGamepads();
      for (let i = 0; i < 4; i++) {
        const gamepad = this.gamepads[i];
        if (gamepad === null) {
          continue;
        }
        const buttons = gamepad.buttons
          .reduce((acc, button, index) => {
            if (button.pressed) {
              acc.push(index);
            }
            return acc;
          }, []);
        const axes = gamepad.axes.slice(0, 2);
        this.actionMapper(buttons, axes, i);
      }
      this.pollingLoop();
    });
  }

  private actionMapper(buttons: number[], axes: number[], index: number) {

    buttons.forEach(button => {
      const action = this.buttonMap[button];
      if (action) {
        this.buttonSubject.next({ action, index });
      }
    });

    const firstAxisAction =
      axes[0] === -1 ? GamepadActions.Left :
        axes[0] === 1 ? GamepadActions.Right :
          null;

    const secondAxisAction =
      axes[1] === 1 ? GamepadActions.Down :
        null;

    if (firstAxisAction) {
      this.axisSubject.next({ action: firstAxisAction, index });
    }
    if (secondAxisAction) {
      this.axisSubject.next({ action: secondAxisAction, index });
    }

  }

}
