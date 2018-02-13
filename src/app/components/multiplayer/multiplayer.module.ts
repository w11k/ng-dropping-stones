import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiplayerComponent } from './multiplayer.component';
import { GameControllerModule } from '../game-controller/game-controller.module';

@NgModule({
  imports: [
    CommonModule,
    GameControllerModule
  ],
  declarations: [MultiplayerComponent]
})
export class MultiplayerModule {
}
