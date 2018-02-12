import { Action } from '@ngrx/store';

export const TICK = 'TICK';
export const INIT = 'INIT';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const ROTATE = 'ROTATE';
export const DROP = 'DROP';

export enum TetrisActionTypes {
  TICK = 'TICK',
  INIT = 'INIT',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  ROTATE = 'ROTATE',
  DROP = 'DROP'
}

export class Tick implements Action {
  readonly type = TetrisActionTypes.TICK;

  constructor(public payload: number) {
  }
}

export class Init implements Action {
  readonly type = TetrisActionTypes.INIT;

  constructor(public payload: number) {
  }
}

export class Left implements Action {
  readonly type = TetrisActionTypes.LEFT;

  constructor(public payload: number) {
  }
}

export class Right implements Action {
  readonly type = TetrisActionTypes.RIGHT;

  constructor(public payload: number) {
  }
}

export class Rotate implements Action {
  readonly type = TetrisActionTypes.ROTATE;

  constructor(public payload: number) {
  }
}

export class Drop implements Action {
  readonly type = TetrisActionTypes.DROP;

  constructor(public payload: number) {
  }
}

export type TetrisAction
  = Tick
  | Init
  | Left
  | Right
  | Rotate
  | Drop;
