import {Component, OnInit, OnDestroy} from '@angular/core';
import {GameService} from "../../service/game.service";
import {Subscription, Observable} from "rxjs";
import {TretrominoPosition} from "../../service/model/tretromino-position.model";
import {Tretromino} from "../../service/model/tretrominos/tetromino.model";
import {TretrominoType} from "../../service/game.constants";

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.less']
})
export class GameBoardComponent implements OnInit, OnDestroy {

  private landedGrid: Array<Array<number>>;
  private landedGridSubscription: Subscription;


  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.landedGridSubscription = this.gameService.getLandedGameGrid().subscribe(landedGrid => this.landedGrid = landedGrid);
  }

  ngOnDestroy() {
    this.landedGridSubscription.unsubscribe();
  }

  getCssClass(cell: number) {
    let cssClass = "dy-grid-cell";

    switch (cell) {
      case TretrominoType.ITYPE:
        cssClass = cssClass + " dy-I";
        break;
      case TretrominoType.JTYPE:
        cssClass = cssClass + " dy-J";
        break;
      case TretrominoType.LTYPE:
        cssClass = cssClass + " dy-L";
        break;
      case TretrominoType.OTYPE:
        cssClass = cssClass + " dy-O";
        break;
      case TretrominoType.STYPE:
        cssClass = cssClass + " dy-S";
        break;
      case TretrominoType.TTYPE:
        cssClass = cssClass + " dy-T";
        break;
      case TretrominoType.ZTYPE:
        cssClass = cssClass + " dy-Z";
        break;
    }

    return cssClass;
  }

  getMovingPiece(): Observable<Tretromino> {
    return this.gameService.getMovingTretromino();
  }
}
