import {Component, OnInit} from "@angular/core";

import * as _ from "underscore";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
  //private gameLoop: any;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    // this.gameLoop = this.setUpGameLoop();
    // this.keyboardService.init();
    this.newGame();
  }

  private setupGameLoop() {
    return _.throttle(this.gameService.gameLoop, 600, {
      leading: false,
      trailing: false
    });
  }

  private loop = this.setupGameLoop();

  private gameOn() {
    window.requestAnimationFrame(() => {
      this.gameOn();
    });
    this.loop();
//    if (!this.GameManager.isPause() && this.GameManager.isGameStart()) {
//      this.gameLoop();
//    }
  }

  private newGame() {
    this.gameService.newGame();
    this.gameOn()
  }

  restartNewGame() {
/*    this.GameManager.newGame();
    this.GameManager.setGameStart();
    window.scrollTo(0, 0);
    return this;*/
  }

  getScore() {
//    return this.GameManager.getScore();
  }

  startNewGame() {
/*    this.GameManager.startNewGame();
    this.gameOn(); */
  }

  isGameStart() {
//    return this.GameManager.isGameStart();
  }

  isGameEnd() {
//    return this.GameManager.isGameEnd();
  }

  isNewRecord() {
//    return this.GameManager.getIsNewRecord();
  }

  getGameSpeed() {
//    let curSpeed = this.GameManager.getGameSpeed();
//    return GameSpeed.getGameSpeedTitle(curSpeed);
  }

  getBestScore() {
    return "-";
  }

  setGameSpeed() {
/*    if (this.isGameStart()) {
      this.GameManager.setPause();
    }*/
  }

  openDesignMenu() {
//    this.GameManager.setOpenDesignBeforeStart(true);
  }

/*
   $scope.$on('Piece.createNewPiece', function() {
   this.GameManager.createNewPiece();
   });

   $scope.$on('BootstrapSlider.Speed', function() {
   gameLoop = setUpGameLoop();
   });
   */
}
