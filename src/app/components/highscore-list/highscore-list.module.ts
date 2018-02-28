import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighscoreListComponent } from './highscore-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [HighscoreListComponent],
  declarations: [HighscoreListComponent]
})
export class HighscoreListModule {
}
