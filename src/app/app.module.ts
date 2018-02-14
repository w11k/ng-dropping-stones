import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { tetrisReducer } from './store/tetrisReducer';
import { RouterModule } from '@angular/router';
import { SinglePlayerModule } from './components/single-player/single-player.module';
import { MultiplayerModule } from './components/multiplayer/multiplayer.module';
import { MultiplayerComponent } from './components/multiplayer/multiplayer.component';
import { SinglePlayerComponent } from './components/single-player/single-player.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { StartScreenModule } from './components/start-screen/start-screen.module';

const routes = [
  {
    path: '', component: StartScreenComponent
  },
  {
    path: 'single', component: SinglePlayerComponent
  },
  {
    path: 'multi', component: MultiplayerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StartScreenModule,
    SinglePlayerModule,
    MultiplayerModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ game: tetrisReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
