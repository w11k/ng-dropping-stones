import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameOverComponent } from './game-over.component';
import { HighscoreModule } from '../../services/highscore/highscore.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HighscoreModule,
    RouterModule
  ],
  declarations: [GameOverComponent]
})
export class GameOverModule { }
