import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartScreenComponent } from './start-screen.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [StartScreenComponent]
})
export class StartScreenModule {
}
