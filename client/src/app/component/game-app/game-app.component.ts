import {Component, OnInit, HostListener, OnDestroy} from "@angular/core";
import {GameService} from "../../service/game.service";
import {GamepadService} from "../../service/gamepad.service";
import {Router} from "@angular/router";
import {HighscoreService} from "../../service/highscore.service";
import * as _ from "lodash";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'game-app',
  templateUrl: './game-app.component.html',
  styleUrls: ['./game-app.component.less']
})
export class GameAppComponent implements OnInit, OnDestroy {
  model: {
    name: string,
    email: string
  } = {
    name: '',
    email: ''
  };
  nameExists: boolean = false;
  private playerNameExistsSubscription: Subscription;
  constructor(private router: Router,
              private gameService: GameService,
              private gamepadService: GamepadService,
              private highscoreService: HighscoreService) {
  }

  ngOnInit() {
    if (this.gamepadService.gamePadAvailable()) {
      this.initGamepadPolling(0);
    }

    this.playerNameExists();
  }

  onSubmit() {
    if (!this.nameExists) {
      this.gameService.setName(this.model.name);
      this.gameService.setEmail(this.model.email);
      this.router.navigateByUrl('/game');
    }
  }

  initGamepadPolling(timestamp: number) {
    window.requestAnimationFrame((timestamp) => {
      this.gamepadService.pollGamepads();
      this.initGamepadPolling(timestamp);
    });
  }

  playerNameExists() {
    this.playerNameExistsSubscription = this.highscoreService
      .playerNameExists(this.model.name)
      .subscribe((res) => {
        if (!_.isEmpty(res)) {
          this.nameExists = true;
        } else {
          this.nameExists = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.playerNameExistsSubscription.unsubscribe();
  }
}
