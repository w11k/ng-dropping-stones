export enum GamepadActions {
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  ROTATE_RIGHT = 'ROTATE_RIGHT',
  ROTATE_LEFT = 'ROTATE_LEFT',
  DROP = 'DROP',
  SELECT = 'SELECT',
  HIGHSCORE = 'HIGHSCORE',
}

export interface TetrisGamepad {
  action: GamepadActions;
  index: number;
}
