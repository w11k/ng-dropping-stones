import { Component, OnInit } from '@angular/core';
import { Tetris } from '../../models/tetris/tetris.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { map } from 'rxjs/operators';
import { AudioService } from '../../services/audio/audio.service';

@Component({
  selector: 'app-multi-game-over',
  templateUrl: './multi-game-over.component.html',
  styleUrls: ['./multi-game-over.component.scss']
})
export class MultiGameOverComponent implements OnInit {

  scores: number[];

  constructor(private store: Store<AppState>,
              private audio: AudioService) {
  }

  get winner(): string {
    return this.scores[0] > this.scores[1] ? 'PLAYER 1' :
      this.scores[0] < this.scores[1] ? 'PLAYER 2' :
        `IT'S A TIE`;
  }

  ngOnInit() {
    this.audio.play('success.ogg');
    this.store.pipe(
      select('game'),
      map((games: Tetris[]) => games.map(game => game.score))
    )
      .subscribe((scores: number[]) => this.scores = scores);
  }

}
