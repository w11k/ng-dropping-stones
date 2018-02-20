import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePlayerComponent } from './single-player.component';
import { GameControllerModule } from '../game-controller/game-controller.module';
import { AudioModule } from '../../services/audio/audio.module';
import { SinglePlayerGuard } from './single-player.guard';

@NgModule({
  imports: [
    CommonModule,
    GameControllerModule,
    AudioModule
  ],
  declarations: [
    SinglePlayerComponent
  ],
  providers: [
    SinglePlayerGuard
  ]
})
export class SinglePlayerModule {
}
