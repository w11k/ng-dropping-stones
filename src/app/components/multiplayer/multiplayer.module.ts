import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiplayerComponent } from './multiplayer.component';
import { GameControllerModule } from '../game-controller/game-controller.module';
import { AudioModule } from '../../services/audio/audio.module';

@NgModule({
  imports: [
    CommonModule,
    GameControllerModule,
    AudioModule
  ],
  declarations: [MultiplayerComponent]
})
export class MultiplayerModule {
}
