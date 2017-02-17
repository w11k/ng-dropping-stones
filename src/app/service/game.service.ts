import { Injectable } from '@angular/core';
import {Subject, Observable, ReplaySubject} from "rxjs";
import {MovingPiece, PotentialPosition} from "./model/pieces/moving-piece.model";
import {Style} from "./model/style.model";
import {MoveEvents} from "./game.constants";
import {PieceService} from "./piece.service";

@Injectable()
export class GameService {

  private landedGrid: Array<Array<number>> = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
  ];

  private EMPTY_ROW: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  private movingPiece: MovingPiece;

  private gameSpeed: number = 10;
  private lastTimestamp: number = 0;

  private landedGridSubject: Subject<Array<Array<number>>>;
  private movingPieceSubject: Subject<Array<Array<number>>>;
  private movingPieceStyleSubject: Subject<Style>;

  constructor(private pieceService: PieceService) {
    this.landedGridSubject = new ReplaySubject<Array<Array<number>>>();
    this.movingPieceSubject = new ReplaySubject<Array<Array<number>>>();
    this.movingPieceStyleSubject = new ReplaySubject<Style>();

    this.movingPiece = pieceService.getNewPiece();

    this.landedGridSubject.next(this.landedGrid);
    this.movingPieceSubject.next(this.movingPiece.shape);
    this.movingPieceStyleSubject.next(this.movingPiece.calculateStyle());
  }

  public getLandedGameGrid(): Observable<Array<Array<number>>> {
    return this.landedGridSubject.asObservable();
  }

  public getMovingPiece(): Observable<Array<Array<number>>> {
    return this.movingPieceSubject.asObservable();
  }

  getMovingPieceStyle(): Observable<Style> {
    return this.movingPieceStyleSubject.asObservable();
  }

  public newGame() {
    // reset old game
  }

  public gameLoop(timestamp: number) {

    let progress = timestamp - this.lastTimestamp;

    if(progress > this.gameSpeed * 100) {

      // check collision
      let potentialPosition = new PotentialPosition(this.movingPiece.row + 1, this.movingPiece.col);
      let collision = this.checkPossibleMoveCollision(potentialPosition);

      if(collision) {
        this.addPieceToLandedGrid(this.movingPiece);
        this.removeCompleteLines();
        this.movingPiece = this.pieceService.getNewPiece();
      } else {
        this.movingPiece.row = potentialPosition.row;
      }
      // draw new stuff
      this.landedGridSubject.next(this.landedGrid);
      this.redrawMovingPiece();

      this.lastTimestamp = timestamp;
    }
  }

  handleUserMoveEvent(moveEvent: MoveEvents) {
    switch(moveEvent) {
      case MoveEvents.ROTATE_CLOCKWISE:
        this.rotatePieceClockWise();
        break;
      case MoveEvents.ROTATE_COUNTER_CLOCKWISE:
        this.rotatePieceCounterClockWise();
        break;
      case MoveEvents.RIGHT:
        this.movePieceRight();
        break;
      case MoveEvents.LEFT:
        this.movePieceLeft();
        break;
      case MoveEvents.DROP:
        this.dropPiece();
        break;
      default: //nothing to do
    }
  }

  private checkPossibleMoveCollision(possibleNextPosition: PotentialPosition): boolean {
    let shape = this.movingPiece.shape;
    let pieceCol = possibleNextPosition.col;
    let pieceRow = possibleNextPosition.row;
    return this.checkPossibleCollision(shape, pieceRow, pieceCol);
  }

  private checkPossibleRotationCollision(potentialShape: Array<Array<number>>): boolean {
    let shape = potentialShape;
    let pieceCol = this.movingPiece.col;
    let pieceRow = this.movingPiece.row ;
    return this.checkPossibleCollision(shape, pieceRow, pieceCol);
  }

  private checkPossibleCollision(shape: Array<Array<number>>, pieceRow: number, pieceCol: number): boolean {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] != 0) {
          if (col + pieceCol < 0) {
            //this block would be to the left of the playing field
            return true;
          } else if (col + pieceCol >= this.landedGrid[0].length) {
            //this block would be to the right of the playing field
            return true;
          } else if (row + pieceRow >= this.landedGrid.length) {
            //this block would be below the playing field
            return true;
          } else if (this.landedGrid[row + pieceRow][col + pieceCol] != 0) {
            // collision with already landed element
            return true;
          }
        }
      }
    }
    return false;
  }

  private removeCompleteLines() {
    for (let rowIndex = 0; rowIndex < this.landedGrid.length; rowIndex++) {
      let row = this.landedGrid[rowIndex];
      if (row.filter((cell) => cell == 0).length == 0) {
        // row doenst contain 0 values -> row is complete
        this.landedGrid.splice(rowIndex, 1);
        this.landedGrid.unshift(this.EMPTY_ROW);
        // TODO: increase speed, count score
      }
    }
  }

  private addPieceToLandedGrid(actualPiece: MovingPiece) {
    for (let row = 0; row < actualPiece.shape.length; row++) {
      for (let col = 0; col < actualPiece.shape[row].length; col++) {
        if (actualPiece.shape[row][col] != 0) {
          this.landedGrid[row + actualPiece.row][col + actualPiece.col] = actualPiece.shape[row][col];
        }
      }
    }
  }

  private rotatePieceClockWise() {
    let potentialShape = this.movingPiece.getPotentialClockwiseShape();
    let collision = this.checkPossibleRotationCollision(potentialShape);

    if(!collision) {
      this.movingPiece.rotateClockwise();
      this.redrawMovingPiece();
    }
  }

  private rotatePieceCounterClockWise() {
    let potentialShape = this.movingPiece.getPotentialCounterClockwiseShape();
    let collision = this.checkPossibleRotationCollision(potentialShape);

    if(!collision) {
      this.movingPiece.rotateCounterClockwise();
      this.redrawMovingPiece();
    }
  }

  private movePieceRight() {
    let potentialPosition = new PotentialPosition(this.movingPiece.row, this.movingPiece.col + 1);
    let collision = this.checkPossibleMoveCollision(potentialPosition);
    if(!collision) {
      this.movingPiece.col = potentialPosition.col;
      this.redrawMovingPiece();
    }
  }

  private movePieceLeft() {
    let potentialPosition = new PotentialPosition(this.movingPiece.row, this.movingPiece.col - 1);
    let collision = this.checkPossibleMoveCollision(potentialPosition);
    if(!collision) {
      this.movingPiece.col = potentialPosition.col;
      this.redrawMovingPiece();
    }
  }

  private dropPiece() {
    let potentialPosition = new PotentialPosition(this.movingPiece.row + 2, this.movingPiece.col);
    let collision = this.checkPossibleMoveCollision(potentialPosition);

    if(!collision) {
      this.movingPiece.row = this.movingPiece.row + 1;
      this.redrawMovingPiece();
    }
  }

  private redrawMovingPiece() {
    this.movingPieceStyleSubject.next(this.movingPiece.calculateStyle());
    this.movingPieceSubject.next(this.movingPiece.shape);
  }
}
