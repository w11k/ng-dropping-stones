///<reference path="../../service/game.service.ts"/>
import {Component, OnInit} from "@angular/core";

import {GameService} from "../../service/game.service";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    // this.keyboardService.init();
    this.newGame();
  }

  private gameOn(timestamp: number) {
    window.requestAnimationFrame((timestamp) => {
      this.gameOn(timestamp);
    });
    this.gameService.gameLoop(timestamp);
  }

  private newGame() {
    this.gameService.newGame();
    this.gameOn(0)
  }
}
