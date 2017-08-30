///<reference path="../../service/game.service.ts"/>
import {Component, OnInit, HostListener, OnDestroy} from "@angular/core";
import {GameService} from "../../service/game.service";
import {Subscription} from "rxjs";
import {GamepadService} from "../../service/gamepad.service";
import {Router} from "@angular/router";
import {HighscoreService} from "../../service/highscore.service";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit, OnDestroy {
  private gameOver: boolean = false;
  private gameStopped:boolean = false;
  private gameOverSubscription: Subscription;
  private gameStoppedSubscription:Subscription;
  private actualStoreSubscription: Subscription;
  private saveHighScoreSubscription: Subscription;
  private saveHighScoreDoneSubscription: Subscription;


  constructor(private gameService: GameService,
              private gamepadService: GamepadService,
              private highscoreService: HighscoreService,
              private router: Router) {
  }

  ngOnInit() {
    this.actualStoreSubscription = this.gameService.getActualScore().subscribe(actualScore => actualScore.name === '' ? this.router.navigateByUrl(''): null);
    this.gameOverSubscription = this.gameService.getGameOver().subscribe(gameOver => this.gameOver = gameOver);
    this.gameStoppedSubscription = this.gameService.getGameStopped().subscribe(gameStopped => this.gameStopped = gameStopped);
    this.newGame();
  }

  private gameOn(timestamp: number) {
    if (!this.gameStopped && !this.gameOver) {
      window.requestAnimationFrame((timestamp) => {
        this.gameService.gameLoop(timestamp);

        if (this.gamepadService.gamePadAvailable()) {
          this.gamepadService.pollGamepads();
        }

        this.gameOn(timestamp);
      });
    }
    if (this.gameOver) {
      // TODO: stop Game Loop, print Game Over Stuff
      this.gameOverFn()
    }
  }

  private newGame() {
    this.gameService.newGame(false, false);
    this.gameOn(0);
  }

  private gameOverFn() {
    this.saveHighScoreSubscription = this.highscoreService
      .saveHighscore()
      .subscribe((x) => {
        this.saveHighScoreDoneSubscription = x.subscribe((y) => {});
        this.gameService.resetGame();
        this.router.navigateByUrl('/highscore')

      });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyInput($event) {
    this.gamepadService.handleKeyboardInput($event);
  }

  ngOnDestroy() {
    this.actualStoreSubscription.unsubscribe();
    if (this.gameOverSubscription) {
      this.gameOverSubscription.unsubscribe();
    }
    if (this.gameStoppedSubscription) {
      this.gameStoppedSubscription.unsubscribe()
    }
    if (this.saveHighScoreDoneSubscription) {
      this.saveHighScoreDoneSubscription.unsubscribe()
    }
    if (this.saveHighScoreSubscription) {
      this.saveHighScoreSubscription.unsubscribe()
    }
  }
}
