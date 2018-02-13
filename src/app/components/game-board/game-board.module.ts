import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [GameBoardComponent],
  declarations: [GameBoardComponent]
})
export class GameBoardModule { }
