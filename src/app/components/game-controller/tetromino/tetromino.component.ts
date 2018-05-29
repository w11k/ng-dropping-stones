import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Tetromino, TetrominoType} from '../../../models/tetromino/tetromino.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {flatten} from '../../../helpers/tetromino-helpers';

@Component({
  selector: 'app-tetromino',
  templateUrl: './tetromino.component.html',
  styleUrls: ['./tetromino.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TetrominoComponent implements OnInit {

  tetromino$ = new BehaviorSubject<Tetromino | null>(null);
  coords$: Observable<string[]>;
  gridWidth$: Observable<string>;

  constructor() {
    this.coords$ = this.tetromino$.pipe(map(it => it ? flatten<number>(it.coordinates).map(num => num === 1 ? `active block-${it.type}` : '') : []));
    this.gridWidth$ = this.tetromino$.pipe(map(it => this.typeToGrid(it.type)));
  }

  @Input()
  set tetromino(value: Tetromino) {
    this.tetromino$.next(value);
  }

  ngOnInit() {
  }

  typeToGrid(type: TetrominoType): 'grid-2' | 'grid-3' | 'grid-4' {
    switch (type) {
      case TetrominoType.I:
        return 'grid-4';
      case TetrominoType.J:
        return 'grid-3';
      case TetrominoType.L:
        return 'grid-3';
      case TetrominoType.O:
        return 'grid-2';
      case TetrominoType.S:
        return 'grid-3';
      case TetrominoType.T:
        return 'grid-3';
      case TetrominoType.Z:
        return 'grid-3';
      default:
        throw new Error(`Wrong type '${type}' submitted.`);
    }
  }

}
