import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameControllerComponent} from './game-controller.component';
import {GameBoardModule} from '../game-board/game-board.module';
import {GameInfoComponent} from './game-info/game-info.component';
import {TetrominoComponent} from './tetromino/tetromino.component';

@NgModule({
  imports: [
    CommonModule,
    GameBoardModule,
  ],
  declarations: [GameControllerComponent, GameInfoComponent, TetrominoComponent],
  exports: [GameControllerComponent]
})
export class GameControllerModule {
}
