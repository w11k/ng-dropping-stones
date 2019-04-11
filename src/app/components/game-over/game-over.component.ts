import {Subscription} from 'rxjs';

import {filter, first, map, throttleTime} from 'rxjs/operators';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Score} from '../../models/highscore/highscore.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state.model';
import {Tetris} from '../../models/tetris/tetris.model';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {Router} from '@angular/router';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {interval} from 'rxjs/internal/observable/interval';
import {environment} from '../../../environments/environment';
import {AngularFireDatabase} from '@angular/fire/database';
import { StorageService } from '../../services/highscore/storage.service';

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
  readonly web = environment.web;

  constructor(private scoreService: StorageService,
              private gamepad: GamepadService,
              private store: Store<AppState>,
              private router: Router,
              private db: AngularFireDatabase) {
  }

  ngOnInit() {

    this.store.select((state: AppState) => state.settings.forceReload).subscribe(forceReload => {
      this.forceReload = forceReload;
    });

    this.gamepad.getActions(1).pipe(
      throttleTime(300),
      filter(action => action === GamepadActions.BACK || action === GamepadActions.OK),
      untilComponentDestroyed(this),
    ).subscribe(() => {
      this.backToMainScreen();
    });

    if (this.web) {
      this.getHighscoresFromDB();
    } else {
      this.getHighscoresFromLocalStorage();
    }

    this.store.pipe(
      select('game'),
      first(),
      map((game: Tetris[]) => game[0] ? game[0].score : 0)
    ).subscribe(score => this.playerScore = score);

    interval(10 * 1000)
      .pipe(
        first(),
        untilComponentDestroyed(this),
      ).subscribe(
        () => this.backToMainScreen()
      );

    this.ESCSubscription = this.gamepad.abortGame();
  }

  private getHighscoresFromLocalStorage() {
    this.highscores = this.scoreService.getContestScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.todaysHighscores = this.scoreService.getTodayContestScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }

  private getHighscoresFromDB() {
    this.db.list('highscore')
      .valueChanges()
      .subscribe(highscores => {
        let todayHighscores: Score[] = highscores as Score[];
        // todays
        todayHighscores = todayHighscores
          .filter(highscore => new Date(highscore.date).toDateString() === new Date().toDateString())
          .sort((a: Score, b: Score) => b.score - a.score)
          .slice(0, 8);

        // all time
        highscores = highscores
          .sort((a: Score, b: Score) => b.score - a.score)
          .slice(0, 8);

        this.todaysHighscores = todayHighscores as Score[];
        this.highscores = highscores as Score[];
      });
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
