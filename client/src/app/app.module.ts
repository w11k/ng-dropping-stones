import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, Http} from "@angular/http";
import {AppComponent} from "./app.component";
import {GameBoardComponent} from "./component/game-board/game-board.component";
import {GameTretrominoComponent} from './component/game-tretromino/game-tretromino.component';
import {GameComponent} from './component/game/game.component';
import {InfoBoardComponent} from './component/info-board/info-board.component';
import {GameService} from "./service/game.service";
import {GamepadService} from "./service/gamepad.service";
import {TretrominoService} from "./service/tretromino.service";
import {GameAppComponent} from "./component/game-app/game-app.component";
import {routing} from "./app.routes";
import {GameHighscoreComponent} from "./component/game-highscore/game-highscore.component";
import {HighscoreService} from "./service/highscore.service";
import {GameConfigComponent} from "./component/game-config/game-config.component";
import {HighscoreLocalStorageService} from "./service/highscoreLocalStorage.service";
import {environment} from "../environments/environment";
import {ConfigService} from "./service/config.service";

export function injectHighscoreService(any: any, dependencies: any) {
  if (environment.rpi) {
    return new HighscoreLocalStorageService(any, dependencies);
  } else {
    return new HighscoreService(any, dependencies);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameTretrominoComponent,
    GameAppComponent,
    GameComponent,
    GameHighscoreComponent,
    GameConfigComponent,
    InfoBoardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    GameService,
    TretrominoService,
    GamepadService,
    ConfigService,
    {
  // inject different services
      provide: HighscoreService,
      useFactory: injectHighscoreService,
      deps: [GameService, Http]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
