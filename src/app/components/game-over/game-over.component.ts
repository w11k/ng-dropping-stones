import { Component, OnInit } from '@angular/core';
import { HighscoreService } from '../../services/highscore/highscore.service';
import { Score } from '../../models/highscore/highscore.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { first, map } from 'rxjs/operators';
import { Tetris } from '../../models/tetris/tetris.model';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

  playerScore: number;
  highscores: Score[];
  todaysHighscores: Score[];

  constructor(private scoreService: HighscoreService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.highscores = this.scoreService.getScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    this.todaysHighscores = this.scoreService.getTodaysScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    this.store.pipe(
      select('game'),
      first(),
      map((game: Tetris[]) => game[0] ? game[0].score : 0)
    ).subscribe(score => this.playerScore = score);
  }

}
