import {Component, OnInit, OnDestroy} from "@angular/core";

import * as _ from "underscore";
import {GameService} from "../../service/game.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'game-piece',
  templateUrl: './game-piece.component.html',
  styleUrls: ['./game-piece.component.less']
})
export class GamePieceComponent implements OnInit, OnDestroy {

  private movingPiece: Array<number>;
  private movingPieceSubscription: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.movingPieceSubscription = this.gameService.getMovingPiece().subscribe(movingPiece => this.movingPiece = movingPiece);
  }

  ngOnDestroy() {
    this.movingPieceSubscription.unsubscribe();
  }

  getStyle() {
    return {
      top: "0px",
      left: "10px"
    }
  }

  isFilled(cell: number) {
    return cell == 1 ? true : false;
  }

//   options = {
//     pieces: _.range(16),
//     checkPattern: checkPattern,
//     getClassForShape: getClassForShape,
//     getLeft: getLeft,
//     getTop: getTop
//   },
/*
  // TODO: removed memoize function, maybe readd for speeeeeeeed
  private getX() {
    return this.getPositionX() * this.gameData.getPieceWidthInPixel() + this.gameData.getBoardWidth();
  }

  private getY() {
    return this.getPositionY() * this.gameData.getPieceWidthInPixel();
  }

  private memCheckPattern(piece) {
    let res = _.find(this.getPattern(), (p) => {
      return piece === p;
    });
    return _.isNumber(res);
  }

  //////////////////

  getPattern() {
    return this.gameManager.getCurrentPattern();
  }

  getPiece() {
    return this.gameManager.getCurrentPiece();
  }

  getPositionX() {
    return this.gameManager.getPositionX();
  }

  getPositionY() {
    return this.gameManager.getPositionY();
  }


  // if sequence is match, then highlight the DOM ele
  checkPattern(piece) {
    if (!this.gameManager.isGameStart()) {
      return;
    }
    return this.memCheckPattern(this.getPattern());
  }

  getClassForShape() {
    if (!this.gameManager.isGameStart() ||
      _.isNull(this.gameManager.getCurrentPiece())) {
      return;
    }
    let pieceClass = '';
    switch (this.gameManager.getCurrentShape()) {
      case 0:
        pieceClass = 'dy-L';
        break;
      case 1:
        pieceClass = 'dy-O';
        break;
      case 2:
        pieceClass = 'dy-I';
        break;
      case 3:
        pieceClass = 'dy-T';
        break;
      case 4:
        pieceClass = 'dy-J';
        break;
      case 5:
        pieceClass = 'dy-S';
        break;
      case 6:
        pieceClass = 'dy-Z';
        break;
      default:
        pieceClass = 'dy-X';
        break;
    }
    return pieceClass;
  }

  getLeft() {
    return this.getX();
  }

  getTop() {
    return this.getY();
  }
  */
}
