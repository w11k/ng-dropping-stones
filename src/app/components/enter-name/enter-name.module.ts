import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnterNameComponent} from './enter-name.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HighscoreModule} from '../../services/highscore/highscore.module';
import {MatDialogModule} from '@angular/material';
import {TacComponent} from './tac/tac.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HighscoreModule,
    MatDialogModule,
  ],
  declarations: [EnterNameComponent, TacComponent],
  exports: [EnterNameComponent],
  entryComponents: [TacComponent],
})
export class EnterNameModule {
}
