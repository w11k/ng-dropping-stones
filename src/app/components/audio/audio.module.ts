import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioComponent } from './audio.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AudioComponent],
  exports: [AudioComponent]
})
export class AudioModule {
}
