import { Component, Input } from '@angular/core';
import { Tetris, DisplayBoard } from '../../model/tetris/tetris.model';
import * as clone from 'clone';
import { dropCollision } from '../../store/mappers/mapper-helpers';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {

  display: DisplayBoard;

  @Input() set game(game: Tetris) {
    this.display = this.render(game);
  }

  render(game: Tetris): DisplayBoard {
    // get a copy of gameboard
    const display = clone(game.board) as DisplayBoard;
    if (game.current === null) {
      return display;
    }
    // draw shadow
    const shadow = clone(game.current);
    while (!dropCollision(display, shadow)) {
      shadow.offset.y += 1;
    }
    shadow.offset.y -= 1;
    shadow.coordinates.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          if (display[y + shadow.offset.y] !== undefined) {
            display[y + shadow.offset.y][x + shadow.offset.x] = 'shadow';
          }
        }
      });
    });

    // add current tetromino to gameboard
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
