import {Injectable} from "@angular/core";
import {GameDataService} from "./game-data.service";
import {Cell} from "../models/Piece.model";

@Injectable()
export class GridService {

  private grid = [];

  constructor(private gameDataService: GameDataService) {
  }

  private coordToPosMem(pos: Cell) {
    // _.memoize(function (pos) {
      return (pos.y * this.getBoardWidth()) + pos.x;
    // }, function (pos) {
    //   return '' + pos.x + pos.y;
    // })
  }

  private posToCoord(i: number) {
    // _.memoize(function (i) {
      let x = i % this.getBoardWidth(),
        y = (i - x) / this.getBoardWidth();

      return {
        x: x,
        y: y
      };
    // })
  }

  private getBoardWidth() {
    return this.gameDataService.getBoardWidth();
  }

  // private method
  private getBoardHeight() {
    return this.gameDataService.getBoardHeight();
  }

  buildEmptyGameBoard() {
    let sizeOfBoard = this.getBoardWidth() * this.getBoardHeight();
    for (let i = 0; i < sizeOfBoard; i++) {
      this.grid[i] = {
        filled: false,
        shape: null,
        ghost: false
      };
    }
  }

  getGridService() {
    return this.grid;
  }

  setGridService(grid) {
    this.grid = grid;
  }

  insertPiece(piece, gameOver) {
    let coordArray = piece.getPieceCoordArray();
    for (let i = 0; i < coordArray.length; i++) {
      let pos = this.coordinatesToPosition(coordArray[i]);
      if (this.grid[pos].filled) {
        gameOver();
      } else {
        this.grid[pos].filled = true;
        this.grid[pos].shape = piece.getShape();
      }
    }
  }

  isPieceVerify(coord) {
    let pos = this.coordinatesToPosition(coord);
    if (this.grid[pos].filled) {
      return false;
    }
    return true;
  }

  checkAndClearFilledRow(cb) {
    for (let i = 0; i < this.getBoardHeight(); i++) {
      let j = 0;
      for (; j < this.getBoardWidth(); j++) {
        let pos = this.coordinatesToPosition({x: j, y: i});
        if (!this.grid[pos].filled) {
          break;
        }
      }
      if (j === this.getBoardWidth()) {
        // clear the row
        this.clearNthRow(i)
        this.movePieceDownLevel(i);
        cb();
      }
    }
  }

  clearNthRow(row) {
    for (let z = 0; z < this.getBoardWidth(); z++) {
      let pos = this.coordinatesToPosition({x: z, y: row});
      this.grid[pos].filled = false;
      this.grid[pos].shape = null;
    }
    return GridService;
  }

  movePieceDownLevel(row) {
    for (let i = row - 1; i >= 0; i--) {
      for (let j = 0; j < this.getBoardWidth(); j++) {
        let curPos = this.coordinatesToPosition({x: j, y: i}),
          nextPos = this.coordinatesToPosition({x: j, y: i + 1});
        // TODO: maybe need to copy value somehow
        this.grid[nextPos] = this.grid[curPos];
        this.grid[curPos].filled = false;
        this.grid[curPos].shape = null;
      }
    }
    return GridService;
  }

  private positionToCoordinates(i) {
    return this.posToCoord(i);
  }

  private coordinatesToPosition(pos: Cell) {
    return this.coordToPosMem(pos);
  }

  resetGhostPiece() {
    for (let i = 0, len = this.grid.length; i < len; i++) {
      this.grid[i].ghost = false;
    }
  }

  updateGhostPiece(cell) {
    let pos = this.coordinatesToPosition(cell);
    if (pos > 0) {
      this.grid[pos].ghost = true;
    }
  }
}
