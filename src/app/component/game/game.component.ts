import {Component, OnInit} from "@angular/core";

import * as _ from "underscore";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
  //private loop: any;

  constructor() {
  }

  ngOnInit() {
    // this.loop = this.setUpGameLoop();
    // this.keyboardService.init();
    // this.newGame();
  }



  setUpGameLoop() {
//    return _.throttle(this.gameLoop, this.GameManager.getGameSpeed(), {
//      leading: false,
//      trailing: false
//    });
  }

  gameLoop() {
//    this.GameManager.moveCurrentPiece();
//    this.GameManager.updateGhostPiece();
  }

  gameOn() {
/*    window.requestAnimationFrame(() => {
      this.gameOn();
    });
    if (!this.GameManager.isPause() && this.GameManager.isGameStart()) {
      this.loop();
    }*/
  }

  newGame() {
//    this.GameManager.newGame();
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
   loop = setUpGameLoop();
   });
   */
}
