import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TretrominoService} from "../../service/tretromino.service";
import {Tretromino} from "../../service/model/tretrominos/tetromino.model";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'game-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['./info-board.component.less']
})
export class InfoBoardComponent implements OnInit, OnDestroy {

  private scoreSubscription: Subscription;
  private level: number = 0;
  private score: number = 0;
  private lines: number = 0;

  constructor(private tretrominoService: TretrominoService, private gameService: GameService) { }

  ngOnInit() {
    this.scoreSubscription = this.gameService.getActualScore().subscribe((score) => {
      this.level = score.level;
      this.score = score.score;
      this.lines = score.lines;
    });
  }

  ngOnDestroy() {
    this.scoreSubscription.unsubscribe();
  }

  getNextTretromino(): Observable<Tretromino> {
    return this.tretrominoService.getNextTretromino();
  }
}
