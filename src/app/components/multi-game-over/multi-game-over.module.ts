import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiGameOverComponent } from './multi-game-over.component';
import { HeaderModule } from '../header/header.module';
import { AudioModule } from '../../services/audio/audio.module';
import { RouterModule } from '@angular/router';
import { GamepadModule } from '../../services/gamepad/gamepad.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    AudioModule,
    RouterModule,
    GamepadModule
  ],
  declarations: [MultiGameOverComponent]
})
export class MultiGameOverModule {
}
