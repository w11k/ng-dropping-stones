import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePlayerComponent } from './single-player.component';
import { GameControllerModule } from '../game-controller/game-controller.module';
import { AudioModule } from '../audio/audio.module';

@NgModule({
  imports: [
    CommonModule,
    GameControllerModule,
    AudioModule
  ],
  declarations: [
    SinglePlayerComponent
  ]
})
export class SinglePlayerModule { }
