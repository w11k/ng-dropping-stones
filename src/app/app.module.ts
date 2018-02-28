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
import { EnterNameComponent } from './components/enter-name/enter-name.component';
import { EnterNameModule } from './components/enter-name/enter-name.module';
import { GameOverComponent } from './components/game-over/game-over.component';
import { GameOverModule } from './components/game-over/game-over.module';
import { SinglePlayerGuard } from './components/single-player/single-player.guard';
import { MultiGameOverComponent } from './components/multi-game-over/multi-game-over.component';
import { MultiGameOverModule } from './components/multi-game-over/multi-game-over.module';
import { HighscoreDisplayComponent } from './components/highscore-display/highscore-display.component';
import { HighscoreDisplayModule } from './components/highscore-display/highscore-display.module';

const routes = [
  {
    path: '', component: StartScreenComponent
  },
  {
    path: 'single', component: SinglePlayerComponent, canActivate: [SinglePlayerGuard]
  },
  {
    path: 'multi', component: MultiplayerComponent
  },
  {
    path: 'enter-name', component: EnterNameComponent
  },
  {
    path: 'game-over', component: GameOverComponent
  },
  {
    path: 'multi-game-over', component: MultiGameOverComponent
  },
  {
    path: 'highscore', component: HighscoreDisplayComponent
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
    MultiGameOverModule,
    HighscoreDisplayModule,
    EnterNameModule,
    GameOverModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ game: tetrisReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
