import { Tetris, Status } from '../../model/tetris/tetris.model';
import { boardWidth } from '../../model/tetris/settings';
import { getRandomTetromino } from '../../helpers/tetromino-helpers';
import * as clone from 'clone';
import { TetrominoType } from '../../model/tetromino/tetromino.model';
import { dropCollision } from './mapper-helpers';

export const tickMapper = (state: Tetris): Tetris => {
  const newState = clone(state) as Tetris;
  if (newState.current === null) {
    return state;
  }

  newState.current.offset.y += 1;

  if (dropCollision(newState.board, newState.current)) {
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
          if (y + offY <= 0) {
            gameOver = true;
          }
          if (newState.board[y + offY] !== undefined) {
            newState.board[y + offY][x + offX] = newState.current.type;
          }
        }
      });
    });
    if (gameOver) {
      console.log('GAME OVER');
      newState.status = Status.GAME_OVER;
      newState.current = null;
    } else {
      newState.score += removeRows(newState.board);
      newState.current = newState.next;
      newState.next = getRandomTetromino({ x: boardWidth / 2 - 1, y: -2 });
    }
  }

  return newState;
};

const removeRows = (board: TetrominoType[][]): number => {

  let rowsCleared = 0;

  board.forEach((row, i) => {
    const full = row.every(val => val !== null);
    if (full) {
      board.unshift(board.splice(i, 1)[0].fill(null));
      rowsCleared++;
    }
  });

  return rowsCleared === 0 ? 0 :
         rowsCleared === 1 ? 40 :
         rowsCleared === 2 ? 100 :
         rowsCleared === 3 ? 300 :
         rowsCleared === 4 ? 1200 :
         0;

};
