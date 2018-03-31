import {Component, OnDestroy, OnInit} from '@angular/core';
import {Score} from '../../models/highscore/highscore.model';
import {HighscoreService} from '../../services/highscore/highscore.service';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {debounceTime, filter, take, takeUntil, tap, throttleTime} from 'rxjs/operators';
import {componentDestroyed} from 'ng2-rx-componentdestroyed';
import {Router} from '@angular/router';
import {PlayerState} from '../../store/reducers/highscore.reducer';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-highscore-display',
  templateUrl: './highscore-display.component.html',
  styleUrls: ['./highscore-display.component.scss']
})
export class HighscoreDisplayComponent implements OnInit, OnDestroy {
  constructor(private highscoreService: HighscoreService,
              private playerStore: Store<PlayerState>,
              private gamepad: GamepadService,
              private router: Router) {
  }

  highscores: Score[];
  todaysHighscores: Score[];

  private player$: Observable<PlayerState>;
  private playerSubscription: Subscription;

  ngOnInit() {

    /* DEBUG */
    this.player$ = this.playerStore
      .first().pipe(
        select('player'),
        tap(store => console.log('store = ', store))
      ) as Observable<PlayerState>;
    this.playerSubscription = this.player$.first().subscribe(
      store => console.log('store = ', store)
    );
    /* /DEBUG */


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
  }

  ngOnDestroy(): void {
    /* DEBUG */
    this.playerSubscription.unsubscribe();
    /* /DEBUG */
  }

}
