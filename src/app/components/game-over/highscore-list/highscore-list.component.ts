import { Component, Input } from '@angular/core';
import { Score } from '../../../models/highscore/highscore.model';

@Component({
  selector: 'app-highscore-list',
  templateUrl: './highscore-list.component.html',
  styleUrls: ['./highscore-list.component.scss']
})
export class HighscoreListComponent {

  @Input() heading: string;
  @Input() highscores: Score[];

}
