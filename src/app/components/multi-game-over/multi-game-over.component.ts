import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Tetris } from '../../models/tetris/tetris.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { debounceTime, map } from 'rxjs/operators';
import { AudioService } from '../../services/audio/audio.service';
import { GamepadService } from '../../services/gamepad/gamepad.service';
import { Subscription } from 'rxjs/Subscription';
import { GamepadActions } from '../../models/gamepad/gamepad.model';

@Component({
  selector: 'app-multi-game-over',
  templateUrl: './multi-game-over.component.html',
  styleUrls: ['./multi-game-over.component.scss']
})
export class MultiGameOverComponent implements OnInit, AfterViewInit {

  scores: number[];
  navigationSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private gamepad: GamepadService,
              private audio: AudioService) {
  }

  get winner(): string {
    return this.scores[0] > this.scores[1] ? 'PLAYER 1' :
      this.scores[0] < this.scores[1] ? 'PLAYER 2' :
        `IT'S A TIE`;
  }

  ngOnInit() {

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

}
