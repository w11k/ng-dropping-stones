import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {GameBoardComponent} from "./component/game-board/game-board.component";
import { GamePieceComponent } from './component/game-piece/game-piece.component';
import { GameComponent } from './component/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GamePieceComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
