import {Component, OnInit, OnDestroy} from '@angular/core';
import {TretrominoService} from '../../service/tretromino.service';
import {Tretromino} from '../../service/model/tretrominos/tetromino.model';
import {GameService} from '../../service/game.service';
import {GamepadService} from '../../service/gamepad.service';
import {HighscoreService} from '../../service/highscore.service';
import {Highscore} from '../../service/model/score.model';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'game-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['./info-board.component.less']
})
export class InfoBoardComponent implements OnInit, OnDestroy {
  gamepadAvailable: Boolean;
  highscore: Highscore;

  private scoreSubscription: Subscription;
  private highscoreSubscription: Subscription;
  public name = '';
  public level = 0;
  public score = 0;
  public lines = 0;

  constructor(private tretrominoService: TretrominoService,
              private gameService: GameService,
              private gamepadService: GamepadService,
              private highscoreService: HighscoreService) {
  }

  ngOnInit() {
    this.scoreSubscription = this.gameService.getActualScore().subscribe((score) => {
      this.name = score.name;
      this.level = score.level;
      this.score = score.score;
      this.lines = score.lines;

      this.highscoreSubscription = this.highscoreService.getHighestHighscore().subscribe(
        (highscore) => {
          this.highscore = highscore;
        }
      );

      this.gamepadAvailable = this.gamepadService.gamePadAvailable();
    });

  }

  getNextTretromino(): Observable<Tretromino> {
    return this.tretrominoService.getNextTretromino();
  }

  ngOnDestroy() {
    this.scoreSubscription.unsubscribe();
    this.highscoreSubscription.unsubscribe();
  }
}
