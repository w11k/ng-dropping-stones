import {Component, OnInit, OnDestroy, HostBinding, Input} from "@angular/core";

import {Subscription, Observable} from "rxjs";
import {TretrominoPosition} from "../../service/model/tretromino-position.model";

@Component({
  selector: 'game-tretromino',
  templateUrl: './game-tretromino.component.html',
  styleUrls: ['./game-tretromino.component.less']
})
export class GameTretrominoComponent implements OnInit, OnDestroy {

  @HostBinding("style.top") top: string = "0px";
  @HostBinding("style.left") left: string = "10px";

  @Input("tretrominoShapeObservable") tretrominoShapeObservable: Observable<Array<Array<number>>>;
  @Input("tretrominoPositionObservable") tretrominoPositionObservable: Observable<TretrominoPosition>;

  private tretrominoShape: Array<Array<number>>;
  private tretrominoShapeSubscription: Subscription;
  private tretrominoPositionSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.tretrominoShapeSubscription = this.tretrominoShapeObservable.subscribe(movingPiece => this.tretrominoShape = movingPiece);
    this.tretrominoPositionSubscription = this.tretrominoPositionObservable.subscribe(style => {
      this.top = style.top + 'px';
      this.left = style.left + 'px';
    });
  }

  ngOnDestroy() {
    this.tretrominoShapeSubscription.unsubscribe();
    this.tretrominoPositionSubscription.unsubscribe();
  }

  isFilled(cell: number) {
    return cell == 1 ? true : false;
  }
}
