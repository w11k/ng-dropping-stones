import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameControllerComponent } from './game-controller.component';
import { GameBoardModule } from '../game-board/game-board.module';
import { GamepadModule } from '../../services/gamepad/gamepad.module';

@NgModule({
  imports: [
    CommonModule,
    GameBoardModule,
    GamepadModule
  ],
  declarations: [GameControllerComponent],
  exports: [GameControllerComponent]
})
export class GameControllerModule {
}
