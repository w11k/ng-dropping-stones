import {Component, OnInit, OnDestroy, HostBinding} from "@angular/core";

import {GameService} from "../../service/game.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'game-piece',
  templateUrl: './game-piece.component.html',
  styleUrls: ['./game-piece.component.less']
})
export class GamePieceComponent implements OnInit, OnDestroy {

  @HostBinding("style.top") top: string = "0px";
  @HostBinding("style.left") left: string = "10px";

  private pieceShape: Array<Array<number>>;
  private pieceShapeSubscription: Subscription;
  private piecePositionSubscription: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.pieceShapeSubscription = this.gameService.getMovingPieceShape().subscribe(movingPiece => this.pieceShape = movingPiece);
    this.piecePositionSubscription = this.gameService.getMovingPiecePosition().subscribe(style => {
      this.top = style.top + 'px';
      this.left = style.left + 'px';
    });
  }

  ngOnDestroy() {
    this.pieceShapeSubscription.unsubscribe();
    this.piecePositionSubscription.unsubscribe();
  }

  isFilled(cell: number) {
    return cell == 1 ? true : false;
  }
}
