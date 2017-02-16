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

  private movingPiece: Array<Array<number>>;
  private movingPieceSubscription: Subscription;
  private movingPieceStyleSubscription: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.movingPieceSubscription = this.gameService.getMovingPiece().subscribe(movingPiece => this.movingPiece = movingPiece);
    this.movingPieceStyleSubscription = this.gameService.getMovingPieceStyle().subscribe(style => {
      this.top = style.top + 'px';
      this.left = style.left + 'px';
    });
  }

  ngOnDestroy() {
    this.movingPieceSubscription.unsubscribe();
    this.movingPieceStyleSubscription.unsubscribe();
  }

  isFilled(cell: number) {
    return cell == 1 ? true : false;
  }
}
