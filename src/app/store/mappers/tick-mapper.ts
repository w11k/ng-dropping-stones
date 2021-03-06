import { Status, Tetris } from '../../models/tetris/tetris.model';
import { randomGenerator } from '../../helpers/tetromino-helpers';
import * as clone from 'clone';
import { TetrominoType } from '../../models/tetromino/tetromino.model';
import { downCollision } from '../../helpers/store-helpers';

export const tickMapper = (state: Tetris[], index: number): Tetris[] => {

  const newState = clone<Tetris[]>(state, false);
  const game = newState[index];
  if (game.current === null) {
    return state;
  }

  game.current.offset.y += 1;

  if (downCollision(game.board, game.current)) {
    game.current.offset.y -= 1;
    const offX = game.current.offset.x;
    const offY = game.current.offset.y;

    let gameOver = false;
    // write block to board
    game.current.coordinates.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          // check if block reached the top
          if (y + offY < 0) {
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

      const rows = removeRows(game.board);
      game.rowsCleared += rows;
      game.score += calculateScore(rows, game.rowsCleared);
      game.current = game.next.shift();

      if (game.next.length < 7) {
        const next = randomGenerator();
        newState.forEach(tetris => {
          tetris.next = tetris.next.concat(next.slice());
        });
      }
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

  return rowsCleared;
};

const calculateScore = (rows: number, totalRowsCleared: number): number => {
  const points = rows === 0 ? 0 :
    rows === 1 ? 40 :
      rows === 2 ? 100 :
        rows === 3 ? 300 :
          rows === 4 ? 1200 :
            0;
  return points * ( Math.floor(totalRowsCleared / 10) + 1);
};
