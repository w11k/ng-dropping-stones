import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {
      provide: StorageService,
      useClass: LocalStorageService
    }
  ]
})
export class HighscoreModule { }
