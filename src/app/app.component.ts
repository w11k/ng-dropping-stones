import {Component, OnInit} from "@angular/core";
import {GameManagerService} from "./service/game-manager.service";
import {AnimFramePolyfillService} from "./service/anim-frame-polyfill.service";
import {KeyboardService} from "./service/keyboard.service";
import * as _ from "underscore";
import {GAMESPEED, GameSpeed} from "./models/GameSpeed";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  private loop: any;

  constructor(private GameManager: GameManagerService,
              private animFramePolyfill: AnimFramePolyfillService,
              private keyboardService: KeyboardService) {
  }

  ngOnInit() {
    this.loop = this.setUpGameLoop();
    this.keyboardService.init();
    this.newGame();
  }


  setUpGameLoop() {
    return _.throttle(this.gameLoop, this.GameManager.getGameSpeed(), {
      leading: false,
      trailing: false
    });
  }


  gameLoop() {
    this.GameManager.moveCurrentPiece();
    this.GameManager.updateGhostPiece();
  }

  gameOn() {
    window.requestAnimationFrame(function () {
      this.gameOn();
    });
    if (!this.GameManager.isPause() && this.GameManager.isGameStart()) {
      this.loop();
    }
  }

  newGame() {
    this.GameManager.newGame();
  }

  restartNewGame() {
    this.GameManager.newGame();
    this.GameManager.setGameStart();
    window.scrollTo(0, 0);
    return this;
  }

  getScore() {
    return this.GameManager.getScore();
  }

  getBestScore(): number|string {
    let score = this.GameManager.getBestScore();
    if (score === 0) {
      return '--';
    } else {
      return score;
    }
  }

  startNewGame() {
    this.GameManager.createNewPiece();
    this.GameManager.setGameStart();
    this.keyboardService.on(function (key) {
      this.GameManager.move(key);
    });
    this.gameOn();
  }

  isGameStart() {
    return this.GameManager.isGameStart();
  }

  isGameEnd() {
    return this.GameManager.isGameEnd();
  }

  isNewRecord() {
    return this.GameManager.getIsNewRecord();
  }

  getGameSpeed() {
    let curSpeed = this.GameManager.getGameSpeed();
    return GameSpeed.getGameSpeedTitle(curSpeed);
  }

  setGameSpeed() {
    if (this.isGameStart()) {
      this.GameManager.setPause();
    }
  }

  openDesignMenu() {
    this.GameManager.setOpenDesignBeforeStart(true);
  }

  saveGame() {
    this.GameManager.saveGame();
  }

  /*
   $scope.$on('Piece.createNewPiece', function() {
   this.GameManager.createNewPiece();
   });

   $scope.$on('BootstrapSlider.Speed', function() {
   loop = setUpGameLoop();
   });
   */
}
