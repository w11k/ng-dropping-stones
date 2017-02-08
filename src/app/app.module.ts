import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GameManagerService} from "./service/game-manager.service";
import {AnimFramePolyfillService} from "./service/anim-frame-polyfill.service";
import {GridService} from "./service/grid.service";
import {GameDataService} from "./service/game-data.service";
import {KeyboardService} from "./service/keyboard.service";
import {LocalStoragePolyfillService} from "./service/local-storage-polyfill.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [AnimFramePolyfillService, GameDataService, GameManagerService, GridService, KeyboardService,
  LocalStoragePolyfillService],
  bootstrap: [AppComponent]
})
export class AppModule { }
