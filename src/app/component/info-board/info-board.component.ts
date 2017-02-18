import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TretrominoService} from "../../service/tretromino.service";
import {TretrominoPosition} from "../../service/model/tretromino-position.model";

@Component({
  selector: 'game-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['./info-board.component.less']
})
export class InfoBoardComponent implements OnInit {

  constructor(private tretrominoService: TretrominoService) { }

  ngOnInit() {
  }

  getNextPieceShape(): Observable<Array<Array<number>>> {
    return this.tretrominoService.getNextTretrominoShape();
  }

  getNextPiecePostion(): Observable<TretrominoPosition> {
    return this.tretrominoService.getNextTretrominoPosition();
  }
}
