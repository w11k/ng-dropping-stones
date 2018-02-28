import { Component, OnInit } from '@angular/core';
import { Score } from '../../models/highscore/highscore.model';
import { HighscoreService } from '../../services/highscore/highscore.service';

@Component({
  selector: 'app-highscore-display',
  templateUrl: './highscore-display.component.html',
  styleUrls: ['./highscore-display.component.scss']
})
export class HighscoreDisplayComponent implements OnInit {

  highscores: Score[];
  todaysHighscores: Score[];

  constructor(private highscoreService: HighscoreService) {
  }

  ngOnInit() {
    this.highscores = this.highscoreService.getScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.todaysHighscores = this.highscoreService.getTodaysScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }

}
