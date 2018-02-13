import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameControllerComponent } from './game-controller.component';
import { GameBoardModule } from '../game-board/game-board.module';

@NgModule({
  imports: [
    CommonModule,
    GameBoardModule
  ],
  declarations: [GameControllerComponent],
  exports: [GameControllerComponent]
})
export class GameControllerModule { }
