import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePlayerComponent } from './single-player.component';
import { GameControllerModule } from '../game-controller/game-controller.module';
import { AudioModule } from '../../services/audio/audio.module';
import { SinglePlayerGuard } from './single-player.guard';
import {CountdownModule} from '../countdown/countdown.module';

@NgModule({
  imports: [
    CommonModule,
    GameControllerModule,
    AudioModule,
    CountdownModule
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
