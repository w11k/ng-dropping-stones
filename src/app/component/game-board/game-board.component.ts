import { Component, OnInit } from '@angular/core';
import {GridService} from "../../service/grid.service";
import {GameDataService} from "../../service/game-data.service";

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.less']
})
export class GameBoardComponent implements OnInit {

  constructor(private gridService: GridService, private gameDate: GameDataService) { }

  ngOnInit() {
  }

  getGridService() {
    return this.gridService.getGridService();
  }

  getFilletClass(cell) {
    let pieceClass = '';
    if (cell.filled) {
      switch(cell.shape) {
        case 0: pieceClass = 'dy-L-filled';
          break;
        case 1: pieceClass = 'dy-O-filled';
          break;
        case 2: pieceClass = 'dy-I-filled';
          break;
        case 3: pieceClass = 'dy-T-filled';
          break;
        case 4: pieceClass = 'dy-J-filled';
          break;
        case 5: pieceClass = 'dy-S-filled';
          break;
        case 6: pieceClass = 'dy-Z-filled';
          break;
        default: pieceClass = 'dy-X-filled';
          break;
      }
    }
    if (cell.ghost) {
      pieceClass += (pieceClass.length > 0) ? ' dy-ghost-piece' : 'dy-ghost-piece';
    }
    if (cell.filled && cell.shape === 7) {
        pieceClass += ' background-color:' + this.gameDate.getColor();
    }
    return pieceClass;
  }
}
