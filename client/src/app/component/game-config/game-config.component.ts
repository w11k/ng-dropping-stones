///<reference path="../../service/game.service.ts"/>
import {Component, OnInit} from "@angular/core";
import {GameService} from "../../service/game.service";
import {Router} from "@angular/router";
import {ConfigService, GameConfig} from "../../service/config.service";

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
    INITIAL_MOVE_INTERVAL?: number,
    FORCE_RELOAD?: boolean
  } = {};

  constructor(private router: Router,
              private configService: ConfigService,
              private gameService: GameService) {
  }

  ngOnInit() {
    let options = this.configService.getGameConfig();
    this.model.INC_LEVEL_PER_LINE = options.incLevelPerLine;
    this.model.GAME_SPEED_MODIFIER = options.gameSpeedModifier;
    this.model.INITIAL_MOVE_INTERVAL = options.initalMoveInterval;
    this.model.FORCE_RELOAD = options.forceReload;
  }

  onSubmit() {
    let options: GameConfig = {
      incLevelPerLine: this.model.INC_LEVEL_PER_LINE,
      gameSpeedModifier: this.model.GAME_SPEED_MODIFIER,
      initalMoveInterval: this.model.INITIAL_MOVE_INTERVAL,
      forceReload: this.model.FORCE_RELOAD
    };
    this.configService.saveGameOptions(options);
    this.gameService.setGameOptions(options);
    this.router.navigateByUrl('');
  }

  onPasswordSubmit() {
    if (this.passwordInput.pw === this.pw) {
      this.unlocked = true;
    }
  }
}
