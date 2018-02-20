import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Tetromino } from '../../../models/tetromino/tetromino.model';
import { flatten } from '../../../helpers/tetromino-helpers';

@Component({
  selector: 'app-tetromino',
  templateUrl: './tetromino.component.html',
  styleUrls: ['./tetromino.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TetrominoComponent implements OnInit {

  @Input() tetromino: Tetromino;

  constructor() {
  }

  ngOnInit() {
  }

  get coordinates(): number[] {
    return flatten<number>(this.tetromino.coordinates);
  }

}
