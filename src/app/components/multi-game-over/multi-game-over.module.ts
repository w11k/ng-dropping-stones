import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiGameOverComponent } from './multi-game-over.component';
import { HeaderModule } from '../header/header.module';
import { AudioModule } from '../../services/audio/audio.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    AudioModule,
    RouterModule
  ],
  declarations: [MultiGameOverComponent]
})
export class MultiGameOverModule {
}
