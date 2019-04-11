import {Component, OnDestroy, OnInit} from '@angular/core';
import {Score} from '../../models/highscore/highscore.model';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {debounceTime, filter, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AngularFireDatabase} from '@angular/fire/database';
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
              private router: Router,
              private db: AngularFireDatabase) {
  }

  highscores: Score[];
  todaysHighscores: Score[];
  private ESCSubscription: Subscription;
  readonly web = environment.web;

  ngOnInit() {
    if (this.web) {
      this.getHighscoresFromDB();
    } else {
      this.getHighscoresFromLocalStorage();
    }

    this.gamepad.getActions(1).pipe(
      debounceTime(250),
      filter(action => action === GamepadActions.BACK || action === GamepadActions.OK),
      take(1),
    ).subscribe(() => {
      this.router.navigate(['/']);
    });

    this.ESCSubscription = this.gamepad.abortGame();

  }

  private getHighscoresFromLocalStorage() {
    this.highscores = this.highscoreService.getContestScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.todaysHighscores = this.highscoreService.getTodayContestScores()
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

  ngOnDestroy(): void {
    this.ESCSubscription.unsubscribe();
  }

}
