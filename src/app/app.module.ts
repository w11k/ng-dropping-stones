import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {tetrisReducer} from './store/tetrisReducer';
import {RouterModule} from '@angular/router';
import {SinglePlayerModule} from './components/single-player/single-player.module';
import {SinglePlayerComponent} from './components/single-player/single-player.component';
import {StartScreenComponent} from './components/start-screen/start-screen.component';
import {StartScreenModule} from './components/start-screen/start-screen.module';
import {EnterNameComponent} from './components/enter-name/enter-name.component';
import {EnterNameModule} from './components/enter-name/enter-name.module';
import {GameOverComponent} from './components/game-over/game-over.component';
import {GameOverModule} from './components/game-over/game-over.module';
import {SinglePlayerGuard} from './components/single-player/single-player.guard';
import {HighscoreDisplayComponent} from './components/highscore-display/highscore-display.component';
import {HighscoreDisplayModule} from './components/highscore-display/highscore-display.module';
import {settingsReducer} from './store/settingsReducer';
import {playerReducer} from './store/reducers/highscore.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppState} from './store/state.model';
import {environment} from '../environments/environment';
import {HeaderModule} from './components/header/header.module';
import {GamepadModule} from './services/gamepad/gamepad.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {HighscoreEffects} from './store/effects/highscore.effects';
import {HighscoreModule} from './services/highscore/highscore.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MultiplayerModule} from './components/multiplayer/multiplayer.module';
import {MultiGameOverModule} from './components/multi-game-over/multi-game-over.module';
import {MultiplayerComponent} from './components/multiplayer/multiplayer.component';
import {MultiGameOverComponent} from './components/multi-game-over/multi-game-over.component';
import {WebGuard} from './web.guard';

const routes = [
  {
    path: '', component: StartScreenComponent
  },
  {
    path: 'single', component: SinglePlayerComponent, canActivate: [SinglePlayerGuard]
  },
  {
    path: 'multi', component: MultiplayerComponent,
    canActivate: [WebGuard]
  },
  {
    path: 'enter-name', component: EnterNameComponent
  },
  {
    path: 'game-over', component: GameOverComponent
  },
  {
    path: 'multi-game-over', component: MultiGameOverComponent,
    canActivate: [WebGuard]
  },
  {
    path: 'highscore', component: HighscoreDisplayComponent
  },
  {
    path: 'settings',
    loadChildren: './routes/settings/settings.module#SettingsModule'
  },
  {
    path: 'winner',
    loadChildren: './routes/winner/winner.module#WinnerModule'
  }
];


/**
 * Set the keys that should be persisted into the localstorage
 *
 * don't use for the game - since localstorage is synchronous / blocking
 */
export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: any) => {
    const keys = ['settings'];
    return localStorageSync({ keys, rehydrate: true, })(reducer)(state, action);
  };
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StartScreenModule,
    SinglePlayerModule,
    MultiplayerModule,
    MultiGameOverModule,
    HighscoreDisplayModule,
    EnterNameModule,
    GameOverModule,
    GamepadModule,
    HeaderModule,
    HighscoreModule,
    RouterModule.forRoot(routes/*, { enableTracing: true }*/),
    StoreModule.forRoot({
      game: tetrisReducer,
      settings: settingsReducer,
      player: playerReducer
    }, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states/**/
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([HighscoreEffects]),
    NgbModule.forRoot(),
  ],
  providers: [WebGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
