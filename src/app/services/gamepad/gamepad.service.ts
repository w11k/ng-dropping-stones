import {Injectable} from '@angular/core';
import {Subject, Observable, Subscription, fromEvent} from 'rxjs';
import {GamepadActions, TetrisGamepad} from '../../models/gamepad/gamepad.model';
import {filter, map, merge, throttleTime} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class GamepadService {

  private gamepads: Gamepad[];
  private buttonSubject = new Subject<TetrisGamepad>();
  private axisSubject = new Subject<TetrisGamepad>();
  private buttonMap: { [key: number]: GamepadActions } = {
    0: GamepadActions.ROTATE_RIGHT,
    1: GamepadActions.ROTATE_LEFT,
    5: GamepadActions.DROP,
    6: GamepadActions.BACK,
    7: GamepadActions.OK
  };

  constructor(private router: Router) {
    this.pollingLoop();
    if (!environment.production) {
      this.numPadListener();
    }
  }

  abortGame(): Subscription {
    return fromEvent(document, 'keyup')
      .subscribe((keyboardEvent: KeyboardEvent) => {
        if (keyboardEvent.key === 'Escape') {
          console.log('*** ESC ***'); // DEBUG
          this.router.navigate(['/']);
        }
      });
  }

  getAllActions(): Observable<GamepadActions> {
    return this.getActions(1).pipe(
      merge(this.getActions(2)),
    );
  }

  /**
   * Caution: If you want to use the Buttons keep in mind
   * that they fire continuously. That means we don't have
   * a keypup event or somthing like that. Rather use a
   * debounceTime of 250 ms.
   *
   * A solution even better would be to change the button
   * subject to also expose a void state. Then you could
   * implement a real keyup event.  */
  getActions(index: number): Observable<GamepadActions> {
    const axes = this.axisSubject.asObservable().pipe(
      filter(gamepad => gamepad.index === index),
      throttleTime(100)
    );
    const buttons = this.buttonSubject.asObservable().pipe(
      filter(gamepad => gamepad.index === index),
      throttleTime(200)
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
      axes[0] === -1 ? GamepadActions.LEFT :
        axes[0] === 1 ? GamepadActions.RIGHT :
          null;

    const secondAxisAction =
      axes[1] === -1 ? GamepadActions.UP :
        axes[1] === 1 ? GamepadActions.DOWN :
          null;


    if (firstAxisAction) {
      this.axisSubject.next({ action: firstAxisAction, index });
    }
    if (secondAxisAction) {
      this.axisSubject.next({ action: secondAxisAction, index });
    }

  }


  /**
   * Is used to fake a gamepad during development. */
  numPadListener() {

    console.log(`
    ###############################################################################
    ############################# Fake GamePad enabled! ###########################
    ###############################################################################

    Use the numpad in order to fake a conntected gamepad. You can use the numbers 2,4,6,8 for down, left, right, up. 
    
    The turn keys are '0' and ',' - to press OK use '*' and to press back use '-' (all on the numpad)
    `);


    window.addEventListener('keydown', (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 98: // = down(2)
          event.preventDefault();
          this.buttonSubject.next({action: GamepadActions.DOWN, index: 1});
          break;
        case 100: // = left(4)
          event.preventDefault();
          this.buttonSubject.next({action: GamepadActions.LEFT, index: 1});
          break;
        case 102: // = right(6)
          event.preventDefault();
          this.buttonSubject.next({action: GamepadActions.RIGHT, index: 1});
          break;
        case 104: // = top(8)
          event.preventDefault();
          this.buttonSubject.next({action: GamepadActions.UP, index: 1});
          break;
        case 106: // = OK(*)
          event.preventDefault();
          this.buttonSubject.next({action: GamepadActions.OK, index: 1});
          break;
        case 109: // = BACK(-)
          event.preventDefault();
          this.buttonSubject.next({action: GamepadActions.BACK, index: 1});
          break;
        case 96: // = ROTATE-LEFT(0)
          event.preventDefault();
          this.buttonSubject.next({action: GamepadActions.ROTATE_LEFT, index: 1});
          break;
        case 108: // = ROTATE-RIGHT(,)
          event.preventDefault();
          this.buttonSubject.next({action: GamepadActions.ROTATE_RIGHT, index: 1});
          break;
      }

    });
  }
}
