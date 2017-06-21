///<reference path="../../service/game.service.ts"/>
import {Component, OnInit} from "@angular/core";
import {GameService} from "../../service/game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.less']
})
export class GameConfigComponent implements OnInit {
  pw: string = 'ui-router';
  unlocked: boolean = false;
  passwordInput: {
    pw?: string;
  } = {};
  model: {
    INC_LEVEL_PER_LINE?: number,
    GAME_SPEED_MODIFIER?: number
    INITIAL_MOVE_INTERVAL?: number
  } = {};

  constructor(private router: Router,
              private gameService: GameService) {
  }

  ngOnInit() {
    let options = this.gameService.getGameOptions();
    this.model.INC_LEVEL_PER_LINE = options.incLevelPerLine;
    this.model.GAME_SPEED_MODIFIER = options.gameSpeedModifier;
    this.model.INITIAL_MOVE_INTERVAL = options.initalMoveInterval;

  }

  onSubmit() {
    this.gameService.setGameOptions(this.model.INC_LEVEL_PER_LINE, this.model.GAME_SPEED_MODIFIER, this.model.INITIAL_MOVE_INTERVAL);
    this.router.navigateByUrl('');
  }

  onPasswordSubmit() {
    if(this.passwordInput.pw === this.pw) {
      this.unlocked = true;
    }
  }
}
