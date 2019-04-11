import {Component, OnDestroy, OnInit} from '@angular/core';
import {Score} from '../../models/highscore/highscore.model';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {debounceTime, filter, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import { StorageService } from '../../services/highscore/storage.service';

@Component({
  selector: 'app-highscore-display',
  templateUrl: './highscore-display.component.html',
  styleUrls: ['./highscore-display.component.scss']
})
export class HighscoreDisplayComponent implements OnInit, OnDestroy {

  constructor(private highscoreService: StorageService,
              // private playerStore: Store<PlayerState>,
              private gamepad: GamepadService,
              private router: Router) {
  }

  highscores: Score[];
  todaysHighscores: Score[];
  private ESCSubscription: Subscription;
  readonly web = environment.web;

  async ngOnInit() {
    this.highscores = (await this.highscoreService.getContestScores())
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.todaysHighscores = (await this.highscoreService.getTodayContestScores())
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    this.gamepad.getActions(1).pipe(
      debounceTime(250),
      filter(action => action === GamepadActions.BACK || action === GamepadActions.OK),
      take(1),
    ).subscribe(() => {
      this.router.navigate(['/']);
    });

    this.ESCSubscription = this.gamepad.abortGame();

  }

  ngOnDestroy(): void {
    this.ESCSubscription.unsubscribe();
  }

}
