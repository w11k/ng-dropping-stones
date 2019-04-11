import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';
import { FirebaseStorageService } from './firebase-storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {
      provide: StorageService,
      useClass: environment.web ? FirebaseStorageService: LocalStorageService
    }
  ]
})
export class HighscoreModule { }
