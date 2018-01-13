import { Tetris, Status } from '../../game-logic/tetris/tetris.model';
<<<<<<< Updated upstream
import { boardWidth } from '../../game-logic/tetris/settings';
import { TetrominoHelper } from '../../game-logic/tetromino/tetromino-helper';
import * as _ from 'lodash';

export const tickMapper = (state: Tetris) => {
  const newState = _.cloneDeep(state) as Tetris;
=======
// import { clone } from '../helpers';
import { boardWidth } from '../../game-logic/tetris/settings';
import { TetrominoHelper } from '../../game-logic/tetromino/tetromino-helper';
import * as clone from 'clone';

export const tickMapper = (state: Tetris) => {
  const newState = clone(state) as Tetris;
  console.log(newState);
>>>>>>> Stashed changes
  if (newState.current === null) {
    return state;
  }

  newState.current.offset.y += 1;

  if (collision(newState)) {
    console.log('collision!');
    newState.current.offset.y -= 1;
    const offX = newState.current.offset.x;
    const offY = newState.current.offset.y;

    let gameOver = false;
    // write block to board
    newState.current.coordinates.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          // check if block reached the top
          if (y + offY === 0) {
            gameOver = true;
          }
          newState.board[y + offY][x + offX] = newState.current.type;
        }
      });
    });
    if (gameOver) {
      console.log('GAME OVER');
      newState.status = Status.GAME_OVER;
      newState.current = null;
    } else {
      newState.current = TetrominoHelper.getRandom({ x: boardWidth / 2 - 1, y: -2 })
    }
  }

  return newState;
};

const collision = (state: Tetris) => {
  const { board, current } = state;
  const coord = current.coordinates;
  const offY = current.offset.y;
  const offX = current.offset.x;

  return coord.some((row, y) => {
    return row.some((value, x) => {
      return value === 1
        && y + offY >= 0
        && (y + offY >= board.length
          || board[y + offY][x + offX] !== null);
    });
  });

}