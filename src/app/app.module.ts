import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { tetrisReducer } from './store/tetrisReducer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ game: tetrisReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
