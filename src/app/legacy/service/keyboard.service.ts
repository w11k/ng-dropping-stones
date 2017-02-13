import {Injectable} from "@angular/core";

@Injectable()
export class KeyboardService {

  private keyEventHandlers = [];

  constructor() {
  }

  keyboardMap = {
    37: KEYTYPE.LEFT,
    38: KEYTYPE.UP,
    39: KEYTYPE.RIGHT,
    40: KEYTYPE.DOWN,
    32: KEYTYPE.DROP,
    27: KEYTYPE.ESCAPE,
    80: KEYTYPE.PAUSE
  };

  init() {
    this.keyEventHandlers = [];
  }

  getKey(which) {
    return this.keyboardMap[which];
  }

  keydownAction(event) {
    let key = this.keyboardMap[event.which];

    if (key) {
      event.preventDefault();
      this.handleKeyEvent(key, event);
    }
  }

  on(cb) {
    this.keyEventHandlers.push(cb);
  }

  private handleKeyEvent(key, event) {
    let callbacks = this.keyEventHandlers;
    if (!callbacks) {
      return;
    }

    event.preventDefault();

    if (callbacks) {
      for (let x = 0; x < callbacks.length; x++) {
        let cb = callbacks[x];
        cb(key, event);
      }
    }
  }
}

export enum KEYTYPE {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
  DROP = 4,
  ESCAPE = 5,
  PAUSE = 6
}
