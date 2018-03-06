import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HighscoreService } from '../../services/highscore/highscore.service';
import { Score } from '../../models/highscore/highscore.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { debounceTime, first, map } from 'rxjs/operators';
import { Tetris } from '../../models/tetris/tetris.model';
import { GamepadService } from '../../services/gamepad/gamepad.service';
import { GamepadActions } from '../../models/gamepad/gamepad.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit, AfterViewInit, OnDestroy {

  playerScore: number;
  highscores: Score[];
  todaysHighscores: Score[];
  navigationSubscription: Subscription;
  private forceReload: boolean;

  constructor(private scoreService: HighscoreService,
              private gamepad: GamepadService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit() {

    this.store.select((state: AppState) => state.settings.forceReload).subscribe(forceReload => {
      this.forceReload = forceReload;
    });

    this.navigationSubscription = this.gamepad.getAllActions().pipe(
      debounceTime(500)
    ).subscribe(action => {
      if (action === GamepadActions.SELECT) {
        this.clickFocused();
      }
    });

    this.highscores = this.scoreService.getScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.todaysHighscores = this.scoreService.getTodaysScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.store.pipe(
      select('game'),
      first(),
      map((game: Tetris[]) => game[0] ? game[0].score : 0)
    ).subscribe(score => this.playerScore = score);
  }

  ngAfterViewInit(): void {
    document.querySelector('a').focus();
  }

  clickFocused() {
    (<HTMLElement>document.activeElement).click();
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }

  backToMainScreen() {
    if (this.forceReload) {
      window.location.href = '/';
    } else {
      this.router.navigate(['/']);
    }
  }

}
