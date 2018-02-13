import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Board, Tetris } from '../../model/tetris/tetris.model';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent {

  display: Board;

  @Input()
  set game(game: Tetris) {
    this.display = this.render(game);
  }

  render(game: Tetris): Board {
    // get a copy of game board
    const display = JSON.parse(JSON.stringify(game.board)) as Board;
    if (game.current === null) {
      return display;
    }

    // add current tetromino to game board
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
    return display;
  }

}
