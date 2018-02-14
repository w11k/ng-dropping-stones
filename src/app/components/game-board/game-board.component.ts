import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Board, Tetris } from '../../models/tetris/tetris.model';
import { TetrominoType } from '../../models/tetromino/tetromino.model';
import * as clone from 'clone';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent {

  display: TetrominoType[];

  @Input()
  set game(game: Tetris) {
    this.display = this.render(game);
  }

  render(game: Tetris): TetrominoType[] {
    if (game.current === null) {
      return flatten<TetrominoType>(game.board);
    }
    const display = clone<Board>(game.board, false);
    const { offset } = game.current;
    game.current.coordinates.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          if (display[y + game.current.offset.y] !== undefined) {
            display[y + offset.y][x + offset.x] = game.current.type;
          }
        }
      });
    });
    return flatten<TetrominoType>(display);
  }

}

function flatten<T>(array: T[][]): T[] {
  return [].concat(...array);
}
