import {Component, OnInit, OnDestroy} from '@angular/core';
import {GameService} from "../../service/game.service";
import {Subscription} from "rxjs";

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

  getFilledClass(cell) {
    let pieceClass ="dy-grid-cell";
    switch (cell) {
      case 1:
        pieceClass += " dy-O-filled";
        break;
      case 0:
      default:
    }
    // console.log(pieceClass);
    return pieceClass;
  }
  /*


getFilletClass(cell) {
  let pieceClass = '';
  if (cell.filled) {
    switch(cell.shape) {
      case 0: pieceClass = 'dy-L-filled';
        break;
      case 1: pieceClass = 'dy-O-filled';
        break;
      case 2: pieceClass = 'dy-I-filled';
        break;
      case 3: pieceClass = 'dy-T-filled';
        break;
      case 4: pieceClass = 'dy-J-filled';
        break;
      case 5: pieceClass = 'dy-S-filled';
        break;
      case 6: pieceClass = 'dy-Z-filled';
        break;
      default: pieceClass = 'dy-X-filled';
        break;
    }
  }
  if (cell.ghost) {
    pieceClass += (pieceClass.length > 0) ? ' dy-ghost-piece' : 'dy-ghost-piece';
  }
  if (cell.filled && cell.shape === 7) {
      pieceClass += ' background-color:' + this.gameDate.getColor();
  }
  return pieceClass;
}
*/
}
