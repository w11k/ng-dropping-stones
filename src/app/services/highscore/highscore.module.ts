import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighscoreService } from './highscore.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [HighscoreService]
})
export class HighscoreModule { }
