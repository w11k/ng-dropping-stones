import {Observable, Subscription} from 'rxjs';

import {first, map, throttleTime} from 'rxjs/operators';
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
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
import {StorageService} from '../../services/highscore/storage.service';
import {getCurrentPlayer, PlayerState} from '../../store/reducers/highscore.reducer';
import {SaveHighscore} from '../../store/actions';

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
  private playerState$: Observable<PlayerState>;
  private currentPlayerSubscription: Subscription;
  currentPlayer: Score;
  @ViewChildren('action') actions: QueryList<ElementRef>;
  private selectedElementRef: ElementRef;

  constructor(private scoreService: StorageService,
              private gamepad: GamepadService,
              private store: Store<AppState>,
              private playerStore: Store<PlayerState>,
              private router: Router) {
  }

  async ngOnInit() {

    this.store.select((state: AppState) => state.settings.forceReload).subscribe(forceReload => {
      this.forceReload = forceReload;
    });

    this.gamepad.getActions(1).pipe(
      throttleTime(300),
      untilComponentDestroyed(this),
    ).subscribe(action => {
      if (action === GamepadActions.BACK) {
        this.backToMainScreen();
      } else if (action === GamepadActions.OK) {
        this.replay();
      } /*else if (action === GamepadActions.RIGHT) {
        this.focusNext();
      } else if (action === GamepadActions.LEFT) {
        this.focusPrev();
      }*/
    });

    this.highscores = (await this.scoreService.getContestScores())
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.todaysHighscores = (await this.scoreService.getTodayContestScores())
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    this.store.pipe(
      select('game'),
      first(),
      map((game: Tetris[]) => game[0] ? game[0].score : 0)
    ).subscribe(score => this.playerScore = score);

    this.playerState$ = this.playerStore.pipe(
      first()).pipe(
      select('player')
    ) as Observable<PlayerState>;
    this.currentPlayerSubscription =
      getCurrentPlayer(this.playerState$)
        .subscribe(p => {
          this.currentPlayer = p;
        });

    // back to main screen after 10 seconds
    interval(10 * 1000)
      .pipe(
        first(),
        untilComponentDestroyed(this),
      ).subscribe(
        () => this.backToMainScreen()
      );

    this.ESCSubscription = this.gamepad.abortGame();
  }

  ngAfterViewInit(): void {
    // this.selectedElementRef = this.actions.first;
    // setTimeout(() => this.selectedElementRef.nativeElement.focus(), 0);
  }
/*
  focusNext() {
    const availableActions = this.getActions();
    const selectedIndex = availableActions.indexOf(this.selectedElementRef);

    if (selectedIndex + 1 === availableActions.length) {
      this.selectedElementRef = availableActions[0];
    } else {
      this.selectedElementRef = availableActions[selectedIndex + 1];
    }

    this.selectedElementRef.nativeElement.focus();
  }

  focusPrev() {
    const availableActions = this.getActions();
    const selectedIndex = availableActions.indexOf(this.selectedElementRef);

    if (selectedIndex === 0) {
      this.selectedElementRef = availableActions[availableActions.length - 1];
    } else {
      this.selectedElementRef = availableActions[selectedIndex - 1];
    }

    this.selectedElementRef.nativeElement.focus();
  }

  private getActions(): ElementRef[] {
    return this.actions.map(elementRef => elementRef);
  }*/


  ngOnDestroy(): void {
    this.ESCSubscription.unsubscribe();
  }

  replay() {
    const newPayload: Score = {
      ...this.currentPlayer,
      score: 0,
      date: new Date().toDateString()
    };

    this.playerStore.dispatch(
      new SaveHighscore(newPayload)
    );
  }

  backToMainScreen() {
    if (this.forceReload) {
      window.location.href = '/';
    } else {
      this.router.navigate(['/']);
    }
  }
}
