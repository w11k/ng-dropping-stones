import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiplayerComponent } from './multiplayer.component';
import { GameControllerModule } from '../game-controller/game-controller.module';
import { AudioModule } from '../../services/audio/audio.module';
import {CountdownModule} from '../countdown/countdown.module';

@NgModule({
  imports: [
    CommonModule,
    GameControllerModule,
    AudioModule,
    CountdownModule
  ],
  declarations: [
    MultiplayerComponent,
  ]
})
export class MultiplayerModule {
}
