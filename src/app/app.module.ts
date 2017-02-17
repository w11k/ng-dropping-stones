import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {GameBoardComponent} from "./component/game-board/game-board.component";
import {GamePieceComponent} from './component/game-piece/game-piece.component';
import {GameComponent} from './component/game/game.component';
import {InfoBoardComponent} from './component/info-board/info-board.component';
import {GameService} from "./service/game.service";
import {PieceService} from "./service/piece.service";

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GamePieceComponent,
    GameComponent,
    InfoBoardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [GameService, PieceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
