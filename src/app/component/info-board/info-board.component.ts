import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TretrominoService} from "../../service/tretromino.service";
import {Tretromino} from "../../service/model/tretrominos/tetromino.model";

@Component({
  selector: 'game-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['./info-board.component.less']
})
export class InfoBoardComponent implements OnInit {

  constructor(private tretrominoService: TretrominoService) { }

  ngOnInit() {
  }

  getNextTretromino(): Observable<Tretromino> {
    return this.tretrominoService.getNextTretromino();
  }
}
