import * as _ from "underscore";
import {PATTERNS, PATTERN_COOR} from "./Constants";
import {GridService} from "../service/grid.service";
export class Piece {
  private position = {x: 4, y: 0};
  private rotation: number;
  private patterns: number;
  private id: string;
  private boardWidth: number;
  private boardHeight: number;

  constructor(x: number = 4, y: number = 0, rotationLimit: number, patternLimit: number,
              boardWidth: number, boardHeight: number, public gridService: GridService) {
    this.position.x = x;
    this.position.y = y;
    this.rotation = Math.floor(Math.random() * rotationLimit);
    this.patterns = Math.floor(Math.random() * patternLimit);
    this.id = GenerateUniqueId.generateUid();
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.gridService.resetGhostPiece();
  }

  getPattern(): number[] {
    if (_.isUndefined(PATTERNS[this.patterns])) {
      // return CustomPiece.getPattern(this.rotation);
      // TODO: fix this mess
      return [];
    } else {
      return PATTERNS[this.patterns][this.rotation];
    }
  }

  getPatternCoord() {
    if (_.isUndefined(PATTERN_COOR[this.patterns])) {
      // return CustomPiece.getPatternCoord(this.rotation);
      // TODO: fix this mess
      return [];
    } else {
      return PATTERN_COOR[this.patterns][this.rotation];
    }
  }

  getShape() {
    return this.patterns;
  }

  getPositionX(): number {
    return this.position.x;
  }

  getPositionY(): number {
    return this.position.y;
  }

  updatePosition(newPosition: Cell, cb?: any) {
    let isMoveDown = isNaN(newPosition.y) ? false : newPosition.y > this.position.y,
      x = isNaN(newPosition.x) ? this.position.x : newPosition.x,
      y = isNaN(newPosition.y) ? this.position.y : newPosition.y,
      isVarify = this.verifyPiece({x: x, y: y});

    if (isVarify) {
      this.position.x = x;
      this.position.y = y;
    } else if (!isVarify && isMoveDown) {
      if (_.isFunction(cb)) {
        cb();
      }
    }
  }

  destroy() {
    this.position.x = null;
    this.position.y = null;
    this.rotation = null;
    this.patterns = null;
    this.id = null;
    this.gridService.resetGhostPiece();
  }

  calculateCollisionPoint(): Cell {
    let cell = {
      x: this.position.x,
      y: this.position.y
    };
    for (let i = cell.y; i < this.boardHeight; i++) {
      cell.y = i;
      if (!this.verifyPiece(cell)) {
        break;
      }
    }
    cell.y--;
    return cell;
  }

  updateGhostPiece() {
    let point = this.calculateCollisionPoint(),
      coord = this.convertPatternToCoordinates(point);
    this.gridService.resetGhostPiece();
    for (let i = 0, len = coord.length; i < len; i++) {
      this.gridService.updateGhostPiece(coord[i]);
    }
  }

  getRotation() {
    return this.rotation;
  }

  setRotation(rotation: number) {
    this.rotation = rotation;
  }

  convertPatternToCoordinates(cell?: Cell) {
    let coord = [...this.getPatternCoord()],
      location = cell || {x: this.position.x, y: this.position.y};
    _.each(coord, function (ele, index) {
      coord[index].x += location.x;
      coord[index].y += location.y;
    });
    return coord;
  }

  private withinGridMem(cell: Cell) {
    // _.memoize((cell) => {
    return cell.x >= 0 && cell.x < this.boardWidth &&
      cell.y >= 0 && cell.y < this.boardHeight;
    // }, (cell) => {
    //   return '' + cell.x + cell.y;
    // });
  }

  withinGrid(cell: Cell) {
    return this.withinGridMem(cell);
  }

  getPatternNumber(): number {
    return this.patterns;
  }

  verifyPiece(cell?: Cell): boolean {
    let coord = this.convertPatternToCoordinates(cell),
      isOk = true;
    for (let i = 0, len = coord.length; i < len; i++) {
      if (!this.withinGrid(coord[i]) || !this.gridService.isPieceVerify(coord[i])) {
        isOk = false;
        break;
      }
    }
    return isOk;
  }

  getPieceCoordArray() {
    return this.convertPatternToCoordinates();
  }
}

export class Cell {
  public x?: number;
  public y?: number;
}

export class GenerateUniqueId {
  static generateUid(): string {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
  }
}
