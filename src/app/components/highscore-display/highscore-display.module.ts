import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighscoreDisplayComponent } from './highscore-display.component';
import { HeaderModule } from '../header/header.module';
import { HighscoreModule } from '../../services/highscore/highscore.module';
import { HighscoreListModule } from '../highscore-list/highscore-list.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    HighscoreModule,
    HighscoreListModule,
    RouterModule
  ],
  declarations: [HighscoreDisplayComponent]
})
export class HighscoreDisplayModule {
}
