import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnterNameComponent} from './enter-name.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HighscoreModule} from '../../services/highscore/highscore.module';
import {TacComponent} from './tac/tac.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HighscoreModule,
    NgbModalModule,
  ],
  declarations: [EnterNameComponent, TacComponent],
  exports: [EnterNameComponent],
  entryComponents: [TacComponent],
})
export class EnterNameModule {
}
