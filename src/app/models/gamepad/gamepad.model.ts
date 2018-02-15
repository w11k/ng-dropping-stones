export enum GamepadActions {
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
  Rotate = 'ROTATE',
  Drop = 'DROP'
}

export interface TetrisGamepad {
  action: GamepadActions;
  index: number;
}
