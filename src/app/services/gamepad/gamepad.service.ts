import { Injectable } from '@angular/core';

@Injectable()
export class GamepadService {

  animationId: number;

  constructor() {
    this.pollingLoop();
  }

  stopPollingLoop() {
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }

  private pollingLoop() {
    this.animationId = window.requestAnimationFrame(() => {
      const gamepads = navigator.getGamepads();
      if (gamepads[0] !== null || gamepads[1] !== null || gamepads[2] !== null) {
        console.log('found it!');
      }
      this.pollingLoop();
    });
  }

}
