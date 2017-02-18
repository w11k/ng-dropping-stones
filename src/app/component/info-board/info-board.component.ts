import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PiecePosition} from "../../service/model/piece-position.model";
import {PieceService} from "../../service/piece.service";

@Component({
  selector: 'game-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['./info-board.component.less']
})
export class InfoBoardComponent implements OnInit {

  constructor(private pieceService: PieceService) { }

  ngOnInit() {
  }

  getNextPieceShape(): Observable<Array<Array<number>>> {
    return this.pieceService.getNextPieceShape();
  }

  getNextPiecePostion(): Observable<PiecePosition> {
    return this.pieceService.getNextPiecePosition();
  }
}
