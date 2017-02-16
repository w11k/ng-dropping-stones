import { Injectable } from '@angular/core';
import {Subject, Observable, ReplaySubject} from "rxjs";
import {MovingPiece, PotentialPosition} from "./model/moving-piece.model";
import {Style} from "./model/style.model";

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

  private movingPiece: MovingPiece = new MovingPiece();

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
        this.movingPiece = new MovingPiece();
      } else {
        this.movingPiece.row = potentialPosition.row;
      }
      // draw new stuff
      this.landedGridSubject.next(this.landedGrid);
      this.movingPieceStyleSubject.next(this.movingPiece.calculateStyle());
      this.movingPieceSubject.next(this.movingPiece.shape);

      this.lastTimestamp = timestamp;
    }
  }

  private checkPossibleCollision(possibleNextPosition: PotentialPosition): boolean {
    for (let row = 0; row < this.movingPiece.shape.length; row++) {
      for (let col = 0; col < this.movingPiece.shape[row].length; col++) {
        if (this.movingPiece.shape[row][col] != 0) {
          if (row + possibleNextPosition.row >= this.landedGrid.length) {
            //this block would be below the playing field
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
}
