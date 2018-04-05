import {Component, OnDestroy, OnInit} from '@angular/core';
import {Score} from '../../models/highscore/highscore.model';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {debounceTime, filter, take, takeUntil} from 'rxjs/operators';
import {componentDestroyed} from 'ng2-rx-componentdestroyed';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-highscore-display',
  templateUrl: './highscore-display.component.html',
  styleUrls: ['./highscore-display.component.scss']
})
export class HighscoreDisplayComponent implements OnInit, OnDestroy {

  constructor(private highscoreService: LocalStorageService,
              // private playerStore: Store<PlayerState>,
              private gamepad: GamepadService,
              private router: Router) {
  }

  highscores: Score[];
  todaysHighscores: Score[];
  private ESCSubscription: Subscription;

  ngOnInit() {

    this.highscores = this.highscoreService.getScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.todaysHighscores = this.highscoreService.getTodaysScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    this.gamepad.getActions(1).pipe(
      takeUntil(componentDestroyed(this)),
      debounceTime(250),
      filter(action => action === GamepadActions.BACK || action === GamepadActions.OK),
      take(1)
    ).subscribe(action => {
      this.router.navigate(['/']);
    });

    this.ESCSubscription = this.gamepad.abortGame();

  }

  ngOnDestroy(): void {
    this.ESCSubscription.unsubscribe();
  }

}
