///<reference path="../../service/game.service.ts"/>
import {Component, OnInit, HostListener, OnDestroy} from "@angular/core";
import {GameService} from "../../service/game.service";
import {Score, Highscore} from "../../service/model/score.model";
import {HighscoreService} from "../../service/highscore.service";
import {GamepadService} from "../../service/gamepad.service";
import * as _ from "lodash";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'game-highscore',
  templateUrl: './game-highscore.component.html',
  styleUrls: ['./game-highscore.component.less']
})
export class GameHighscoreComponent implements OnInit, OnDestroy {
  private highscore: Highscore[];
  private highscoreAlltime: Highscore[];
  public gamepadAvailable: boolean;

  public playerName: string;

  public currentPlayerPositionAlltime: number;
  public currentPlayerPositionToday: number;
  private highscoreForTodaySubscription: Subscription;
  private highscoreAlltimeSubscription: Subscription;

  constructor(private gameService: GameService,
              private highscoreService: HighscoreService,
              private gamepadService: GamepadService) {
  }

  ngOnInit() {
    this.gamepadAvailable = this.gamepadService.gamePadAvailable();

    let score = this.highscoreService.getPlayerScore() || new Score();
    this.playerName = score.name;

    this.highscoreForTodaySubscription = this.highscoreService
      .getHighscoreForToday()
      .subscribe((scores: Highscore[]) => {
        this.highscore = scores;

        this.highscoreAlltimeSubscription = this.highscoreService
          .getHighscoreAlltime()
          .subscribe((scores: Highscore[]) => {
            this.highscoreAlltime = scores;

            this.getCurrentPlayerHighscorePosition();

            if (this.gamepadService.gamePadAvailable()) {
              this.initGamepadPolling(0);
            }
          });
      });
  }

  initGamepadPolling(timestamp: number) {
    window.requestAnimationFrame((timestamp) => {
      this.gamepadService.pollGamepads();
      this.initGamepadPolling(timestamp);
    });
  }

  getCurrentPlayerHighscorePosition() {
    this.currentPlayerPositionToday = (_.findIndex(this.highscore, {name: this.playerName}) + 1);
    this.currentPlayerPositionAlltime = (_.findIndex(this.highscoreAlltime, {name: this.playerName}) + 1);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyInput($event) {
    this.gamepadService.handleKeyboardInput($event);
  }

  ngOnDestroy(): void {
    this.highscoreAlltimeSubscription.unsubscribe();
    this.highscoreForTodaySubscription.unsubscribe();
  }
}
