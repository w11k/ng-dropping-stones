import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [LocalStorageService]
})
export class HighscoreModule { }
