import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameOverComponent } from './game-over.component';
import { HighscoreModule } from '../../services/highscore/highscore.module';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { GamepadModule } from '../../services/gamepad/gamepad.module';
import { HighscoreListModule } from '../highscore-list/highscore-list.module';

@NgModule({
  imports: [
    CommonModule,
    HighscoreModule,
    RouterModule,
    HeaderModule,
    GamepadModule,
    HighscoreListModule
  ],
  declarations: [GameOverComponent]
})
export class GameOverModule {
}
