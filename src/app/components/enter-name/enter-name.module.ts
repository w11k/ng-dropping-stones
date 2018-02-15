import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterNameComponent } from './enter-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [EnterNameComponent],
  exports: [EnterNameComponent]
})
export class EnterNameModule {
}
