import {Component, OnInit, OnDestroy, HostBinding, Input} from "@angular/core";
import {TretrominoType} from "../../service/game.constants";
import {Tretromino} from "../../service/model/tretrominos/tetromino.model";
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'game-tretromino',
  templateUrl: './game-tretromino.component.html',
  styleUrls: ['./game-tretromino.component.less']
})
export class GameTretrominoComponent implements OnInit, OnDestroy {

  @HostBinding("style.top") top: string = "0px";
  @HostBinding("style.left") left: string = "10px";

  @Input("tretrominoObservable") tretrominoObservable: Observable<Tretromino>;

  public tretrominoShape: Array<Array<number>>;
  private tretrominoSubscription: Subscription;
  private type: TretrominoType;

  constructor() {
  }

  ngOnInit() {
    this.tretrominoSubscription = this.tretrominoObservable.subscribe(tretromino => {
      this.tretrominoShape = tretromino.shape;
      let position = tretromino.calculatePosition();
      this.top = position.top + 'px';
      this.left = position.left + 'px';
      this.type = tretromino.type;
    });
  }

  ngOnDestroy() {
    this.tretrominoSubscription.unsubscribe();
  }

  isFilled(cell: number) {
    return cell == 1 ? true : false;
  }

  cssForTretromino() {
    let cssClass = "dy-piece-ul dy-";

    switch(this.type) {
      case TretrominoType.ITYPE:
        cssClass = cssClass + "I";
        break;
      case TretrominoType.JTYPE:
        cssClass = cssClass + "J";
        break;
      case TretrominoType.LTYPE:
        cssClass = cssClass + "L";
        break;
      case TretrominoType.OTYPE:
        cssClass = cssClass + "O";
        break;
      case TretrominoType.STYPE:
        cssClass = cssClass + "S";
        break;
      case TretrominoType.TTYPE:
        cssClass = cssClass + "T";
        break;
      case TretrominoType.ZTYPE:
        cssClass = cssClass + "Z";
        break;
    }

    return cssClass;
  }
}
