import {of as observableOf, Subscription} from 'rxjs';

import {delay, filter, first, map, takeUntil, throttleTime} from 'rxjs/operators';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {Score} from '../../models/highscore/highscore.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state.model';
import {Tetris} from '../../models/tetris/tetris.model';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {Router} from '@angular/router';
import {componentDestroyed} from 'ng2-rx-componentdestroyed';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit, AfterViewInit, OnDestroy {

  playerScore: number;
  highscores: Score[];
  todaysHighscores: Score[];
  private forceReload: boolean;
  private ESCSubscription: Subscription;

  constructor(private scoreService: LocalStorageService,
              private gamepad: GamepadService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit() {

    this.store.select((state: AppState) => state.settings.forceReload).subscribe(forceReload => {
      this.forceReload = forceReload;
    });

    this.gamepad.getActions(1).pipe(
      takeUntil(componentDestroyed(this)),
      throttleTime(300),
      filter(action => action === GamepadActions.BACK || action === GamepadActions.OK)
    ).subscribe(() => {
      this.backToMainScreen();
    });

    this.highscores = this.scoreService.getContestScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.todaysHighscores = this.scoreService.getTodayContestScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.store.pipe(
      select('game'),
      first(),
      map((game: Tetris[]) => game[0] ? game[0].score : 0)
    ).subscribe(score => this.playerScore = score);

    observableOf(1)
      .pipe(
        delay(10 * 1000),
        first(),
      )
      .subscribe(
        () => this.backToMainScreen()
      );

    this.ESCSubscription = this.gamepad.abortGame();
  }

  ngAfterViewInit(): void {
    document.querySelector('a').focus();
  }

  ngOnDestroy(): void {
    this.ESCSubscription.unsubscribe();
  }

  backToMainScreen() {
    if (this.forceReload) {
      window.location.href = '/';
    } else {
      this.router.navigate(['/']);
    }
  }

}
