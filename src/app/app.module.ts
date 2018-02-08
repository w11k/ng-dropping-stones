import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { tetrisReducer } from './store/tetrisReducer';
import { RouterModule } from '@angular/router';
import { GameControllerComponent } from './game-controller/game-controller.component';
import { GameControllerModule } from './game-controller/game-controller.module';


const routes = [
  {
    path: '', component: GameControllerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameControllerModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ game: tetrisReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
