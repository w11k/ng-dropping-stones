import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { tetrisReducer } from './store/tetrisReducer';
import { RouterModule } from '@angular/router';
import { SinglePlayerModule } from './components/single-player/single-player.module';
import { MultiplayerModule } from './components/multiplayer/multiplayer.module';
import { MultiplayerComponent } from './components/multiplayer/multiplayer.component';

const routes = [
  {
    path: '', component: MultiplayerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SinglePlayerModule,
    MultiplayerModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ game: tetrisReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
