import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartScreenComponent } from './start-screen.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { GamepadModule } from '../../services/gamepad/gamepad.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    GamepadModule
  ],
  declarations: [StartScreenComponent]
})
export class StartScreenModule {
}
