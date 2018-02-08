import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { tetrisReducer } from './store/tetrisReducer';
import { RouterModule } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameBoardModule } from './game-board/game-board.module';


const routes = [
  {
    path: '', component: GameBoardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameBoardModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ game: tetrisReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
