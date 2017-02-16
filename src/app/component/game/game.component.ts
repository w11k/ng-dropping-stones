///<reference path="../../service/game.service.ts"/>
import {Component, OnInit, HostListener} from "@angular/core";

import {GameService} from "../../service/game.service";
import {MoveEvents} from "../../service/game.constants";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
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

  @HostListener('window:keydown', ['$event'])
  handleKeyInput($event) {
    switch($event.code) {
      case "ArrowLeft":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(MoveEvents.LEFT);
        break;
      case "ArrowRight":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(MoveEvents.RIGHT);
        break;
      case "ArrowUp":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(MoveEvents.ROTATE_COUNTER_CLOCKWISE);
        break;
      case "ArrowDown":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(MoveEvents.ROTATE_CLOCKWISE);
        break;
      case "Space":
        $event.preventDefault();
        this.gameService.handleUserMoveEvent(MoveEvents.DROP);
        break;
      default:
    }
  }
}
