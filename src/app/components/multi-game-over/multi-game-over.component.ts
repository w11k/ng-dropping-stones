import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Tetris } from '../../models/tetris/tetris.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { debounceTime, map } from 'rxjs/operators';
import { AudioService } from '../../services/audio/audio.service';
import { GamepadService } from '../../services/gamepad/gamepad.service';
import { Subscription } from 'rxjs/Subscription';
import { GamepadActions } from '../../models/gamepad/gamepad.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-game-over',
  templateUrl: './multi-game-over.component.html',
  styleUrls: ['./multi-game-over.component.scss']
})
export class MultiGameOverComponent implements OnInit, AfterViewInit {

  scores: number[];
  navigationSubscription: Subscription;
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

    this.navigationSubscription = this.gamepad.getAllActions().pipe(
      debounceTime(500)
    ).subscribe(action => {
      if (action === GamepadActions.SELECT) {
        this.clickFocused();
      }
    });

    this.audio.play('success.ogg');
    this.store.pipe(
      select('game'),
      map((games: Tetris[]) => games.map(game => game.score))
    )
      .subscribe((scores: number[]) => this.scores = scores);
  }

  ngAfterViewInit(): void {
    document.querySelector('a').focus();
  }

  clickFocused() {
    (<HTMLElement>document.activeElement).click();
  }

  backToMainScreen() {
    if (this.forceReload) {
      window.location.href = '/';
    } else {
      this.router.navigate(['/']);
    }
  }

}
