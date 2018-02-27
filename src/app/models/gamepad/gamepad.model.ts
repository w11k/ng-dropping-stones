export enum GamepadActions {
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
  Rotate_Right = 'ROTATE_RIGHT',
  Rotate_Left = 'ROTATE_LEFT',
  Drop = 'DROP'
}

export interface TetrisGamepad {
  action: GamepadActions;
  index: number;
}
