import {Component, OnInit, OnDestroy, HostBinding, Input} from "@angular/core";

import {Subscription, Observable} from "rxjs";
import {PiecePosition} from "../../service/model/piece-position.model";

@Component({
  selector: 'game-piece',
  templateUrl: './game-piece.component.html',
  styleUrls: ['./game-piece.component.less']
})
export class GamePieceComponent implements OnInit, OnDestroy {

  @HostBinding("style.top") top: string = "0px";
  @HostBinding("style.left") left: string = "10px";

  @Input("pieceShapeObservable") pieceShapeObservable: Observable<Array<Array<number>>>;
  @Input("piecePositionObservable") piecePositionObservable: Observable<PiecePosition>;

  private pieceShape: Array<Array<number>>;
  private pieceShapeSubscription: Subscription;
  private piecePositionSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.pieceShapeSubscription = this.pieceShapeObservable.subscribe(movingPiece => this.pieceShape = movingPiece);
    this.piecePositionSubscription = this.piecePositionObservable.subscribe(style => {
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
