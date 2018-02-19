import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameControllerComponent } from './game-controller.component';
import { GameBoardModule } from '../game-board/game-board.module';
import { GamepadModule } from '../../services/gamepad/gamepad.module';
import { GameInfoComponent } from './game-info/game-info.component';

@NgModule({
  imports: [
    CommonModule,
    GameBoardModule,
    GamepadModule
  ],
  declarations: [GameControllerComponent, GameInfoComponent],
  exports: [GameControllerComponent]
})
export class GameControllerModule {
}
