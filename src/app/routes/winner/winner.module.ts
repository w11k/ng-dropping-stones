import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnerComponent } from './winner.component';
import { SelectComponent } from './select/select.component';
import {WinnerRoutingModule} from './winner-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    WinnerRoutingModule,
  ],
  declarations: [WinnerComponent, SelectComponent]
})
export class WinnerModule { }
