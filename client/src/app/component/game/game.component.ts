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


  constructor(private gameService: GameService,
              private gamepadService: GamepadService,
              private highscoreService: HighscoreService,
              private router: Router) {
  }

  ngOnInit() {
    this.gameService.getActualScore().subscribe(actualScore => actualScore.name === '' ? this.router.navigateByUrl(''): null)
    this.gameOverSubscription = this.gameService.getGameOver().subscribe(gameOver => this.gameOver = gameOver);
    this.gameStoppedSubscription = this.gameService.getGameStopped().subscribe(gameStopped => this.gameStopped = gameStopped);
    this.newGame();
  }

  ngOnDestroy() {
    this.gameOverSubscription.unsubscribe();
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
    this.highscoreService
      .saveHighscore()
      .subscribe((x) => {
        x.subscribe((y) => {});
        this.router.navigateByUrl('/highscore')

      });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyInput($event) {
    this.gamepadService.handleKeyboardInput($event);
  }
}
