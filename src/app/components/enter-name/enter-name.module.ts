import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterNameComponent } from './enter-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HighscoreModule } from '../../services/highscore/highscore.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HighscoreModule
  ],
  declarations: [EnterNameComponent],
  exports: [EnterNameComponent]
})
export class EnterNameModule {
}
