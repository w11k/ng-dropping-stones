import { Injectable } from '@angular/core';

@Injectable()
export class GamepadService {

  gamepads: Gamepad[];

  constructor() {
    this.pollingLoop();
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
    // todo: implement
    console.log(`buttons: ${buttons}`);
    console.log(`axes: ${axes}`);
    console.log(`index: ${index}`);
  }

}
