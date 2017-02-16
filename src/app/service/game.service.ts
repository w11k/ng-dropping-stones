import { Injectable } from '@angular/core';
import {Subject, Observable, ReplaySubject} from "rxjs";
import {MovingPiece, PotentialPosition} from "./model/pieces/moving-piece.model";
import {Style} from "./model/style.model";
import {MoveEvents} from "./game.constants";
import {LPiece} from "./model/pieces/lpiece.model";

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
    [1, 1, 1, 1, 0, 0, 1, 0, 1, 1]
  ];

  private movingPiece: MovingPiece = new LPiece();

  private gameSpeed: number = 10;
  private lastTimestamp: number = 0;

  private landedGridSubject: Subject<Array<Array<number>>>;
  private movingPieceSubject: Subject<Array<Array<number>>>;
  private movingPieceStyleSubject: Subject<Style>;

  constructor() {
    this.landedGridSubject = new ReplaySubject<Array<Array<number>>>();
    this.movingPieceSubject = new ReplaySubject<Array<Array<number>>>();
    this.movingPieceStyleSubject = new ReplaySubject<Style>();

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
      let collision = this.checkPossibleCollision(potentialPosition);

      if(collision) {
        this.addPieceToLandedGrid(this.movingPiece);
        this.movingPiece = new LPiece();
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

  private checkPossibleCollision(possibleNextPosition: PotentialPosition): boolean {
    for (let row = 0; row < this.movingPiece.shape.length; row++) {
      for (let col = 0; col < this.movingPiece.shape[row].length; col++) {
        if (this.movingPiece.shape[row][col] != 0) {
          if (row + possibleNextPosition.row >= this.landedGrid.length) {
            //this block would be below the playing field
            return true;
          } else if(col + possibleNextPosition.col < 0) {
            //this block would be to the left of the playing field
            return true;
          } else if(col + possibleNextPosition.col >= this.landedGrid[0].length) {
            //this block would be to the right of the playing field
            return true;
          } else if (this.landedGrid[row + possibleNextPosition.row][col + possibleNextPosition.col] != 0) {
            // collision with already landed element
            return true;
          }
        }
      }
    }
    return false;
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

  private checkPossibleRotationCollision(potentialShape: Array<Array<number>>): boolean {
    for (var row = 0; row < potentialShape.length; row++) {
      for (var col = 0; col < potentialShape[row].length; col++) {
        if (potentialShape[row][col] != 0) {
          if (col + this.movingPiece.col < 0) {
            //this block would be to the left of the playing field
            return true;
          } else if (col + this.movingPiece.col >= this.landedGrid[0].length) {
            //this block would be to the right of the playing field
            return true;
          } else if (row + this.movingPiece.row >= this.landedGrid.length) {
            //this block would be below the playing field
            return true;
          } else if (this.landedGrid[row + this.movingPiece.row][col + this.movingPiece.col] != 0) {
            // collision with already landed element
            return true;
          }
        }
      }
    }
  }

  private movePieceRight() {
    let potentialPosition = new PotentialPosition(this.movingPiece.row, this.movingPiece.col + 1);
    let collision = this.checkPossibleCollision(potentialPosition);
    if(!collision) {
      this.movingPiece.col = potentialPosition.col;
      this.redrawMovingPiece();
    }
  }

  private movePieceLeft() {
    let potentialPosition = new PotentialPosition(this.movingPiece.row, this.movingPiece.col - 1);
    let collision = this.checkPossibleCollision(potentialPosition);
    if(!collision) {
      this.movingPiece.col = potentialPosition.col;
      this.redrawMovingPiece();
    }
  }

  private dropPiece() {
    console.log("Drop piece");
  }

  private redrawMovingPiece() {
    this.movingPieceStyleSubject.next(this.movingPiece.calculateStyle());
    this.movingPieceSubject.next(this.movingPiece.shape);
  }
}
