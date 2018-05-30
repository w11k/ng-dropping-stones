import {debounceTime, filter, first, map} from 'rxjs/operators';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Tetris} from '../../models/tetris/tetris.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state.model';
import {AudioService} from '../../services/audio/audio.service';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {Router} from '@angular/router';
import {untilComponentDestroyed} from 'ng2-rx-componentdestroyed';
import {interval} from 'rxjs/internal/observable/interval';


@Component({
  selector: 'app-multi-game-over',
  templateUrl: './multi-game-over.component.html',
  styleUrls: ['./multi-game-over.component.scss']
})
export class MultiGameOverComponent implements OnInit, AfterViewInit, OnDestroy {


  scores: number[];
  private forceReload: boolean;

  constructor(private store: Store<AppState>,
              private gamepad: GamepadService,
              private audio: AudioService,
              private router: Router) {
  }

  get winner(): string {
    return this.scores[0] > this.scores[1] ? 'PLAYER 1' :
      this.scores[0] < this.scores[1] ? 'PLAYER 2' :
        `IT'S A TIE`;
  }

  ngOnInit() {

    this.store.select((state: AppState) => state.settings.forceReload).subscribe(forceReload => {
      this.forceReload = forceReload;
    });

    this.gamepad.getActions(1).pipe(
      debounceTime(250),
      filter(action => action === GamepadActions.BACK || action === GamepadActions.OK),
      untilComponentDestroyed(this),
    ).subscribe(() => {
      this.backToMainScreen();
    });

    this.audio.play('success.ogg');
    this.store.pipe(
      select('game'),
      map((games: Tetris[]) => games.map(game => game.score))
    )
      .subscribe((scores: number[]) => this.scores = scores);

    interval(10 * 1000)
      .pipe(
        first(),
        untilComponentDestroyed(this),
      ).subscribe(() => this.backToMainScreen());
  }

  ngAfterViewInit(): void {
    document.querySelector('a').focus();
  }

  backToMainScreen() {
    if (this.forceReload) {
      window.location.href = '/';
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
  }

}
