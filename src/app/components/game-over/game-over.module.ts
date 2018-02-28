import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameOverComponent } from './game-over.component';
import { HighscoreModule } from '../../services/highscore/highscore.module';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { HighscoreListComponent } from './highscore-list/highscore-list.component';
import { GamepadModule } from '../../services/gamepad/gamepad.module';

@NgModule({
  imports: [
    CommonModule,
    HighscoreModule,
    RouterModule,
    HeaderModule,
    GamepadModule
  ],
  declarations: [GameOverComponent, HighscoreListComponent]
})
export class GameOverModule { }
