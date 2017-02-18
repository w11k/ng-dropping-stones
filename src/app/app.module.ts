import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {GameBoardComponent} from "./component/game-board/game-board.component";
import {GameTretrominoComponent} from './component/game-tretromino/game-tretromino.component';
import {GameComponent} from './component/game/game.component';
import {InfoBoardComponent} from './component/info-board/info-board.component';
import {GameService} from "./service/game.service";
import {TretrominoService} from "./service/tretromino.service";

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameTretrominoComponent,
    GameComponent,
    InfoBoardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [GameService, TretrominoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
