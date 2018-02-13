import { Status, Tetris } from '../../model/tetris/tetris.model';
import { boardWidth } from '../../model/tetris/settings';
import { getRandomTetromino } from '../../helpers/tetromino-helpers';
import * as clone from 'clone';
import { TetrominoType } from '../../model/tetromino/tetromino.model';
import { downCollision } from '../../helpers/store-helpers';

export const tickMapper = (state: Tetris[], index: number): Tetris[] => {

  const newState = clone(state) as Tetris[];
  const game = newState[index];
  if (game.current === null) {
    return state;
  }

  game.current.offset.y += 1;

  if (downCollision(game.board, game.current)) {
    console.log('collision!');
    game.current.offset.y -= 1;
    const offX = game.current.offset.x;
    const offY = game.current.offset.y;

    let gameOver = false;
    // write block to board
    game.current.coordinates.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          // check if block reached the top
          if (y + offY <= 0) {
            gameOver = true;
          }
          if (game.board[y + offY] !== undefined) {
            game.board[y + offY][x + offX] = game.current.type;
          }
        }
      });
    });
    if (gameOver) {
      console.log('GAME OVER');
      game.status = Status.GAME_OVER;
      game.current = null;
    } else {
      game.score += removeRows(game.board);
      game.current = game.next;
      game.next = getRandomTetromino({x: boardWidth / 2 - 1, y: -2});
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
