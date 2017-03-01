import { Injectable } from '@angular/core';
import {Subject, Observable, ReplaySubject} from "rxjs";
import {MoveEvents} from "./game.constants";
import {Tretromino} from "./model/tretrominos/tetromino.model";
import {TretrominoService} from "./tretromino.service";
import {PotentialPosition} from "./model/potential-position.model";
import {Score} from "./model/score.model";

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  private movingTretromino: Tretromino;

  private lastTimestamp: number = 0;
  private actualScore: Score = new Score();

  private gameOverSubject: Subject<boolean>;
  private landedGridSubject: Subject<Array<Array<number>>>;
  private actualScoreSubject: Subject<Score>;
  private movingTretrominoSubject: Subject<Tretromino>;

  constructor(private tretrominoService: TretrominoService) {
    this.gameOverSubject = new ReplaySubject<boolean>();
    this.landedGridSubject = new ReplaySubject<Array<Array<number>>>();
    this.movingTretrominoSubject = new ReplaySubject<Tretromino>();
    this.actualScoreSubject = new ReplaySubject<Score>();

    this.movingTretromino = tretrominoService.getNewTretromino();

    this.gameOverSubject.next(false);
    this.landedGridSubject.next(this.landedGrid);
    this.movingTretrominoSubject.next(this.movingTretromino);
    this.actualScoreSubject.next(this.actualScore);
  }

  public getLandedGameGrid(): Observable<Array<Array<number>>> {
    return this.landedGridSubject.asObservable();
  }

  public getMovingTretromino(): Observable<Tretromino> {
    return this.movingTretrominoSubject.asObservable();
  }

  public getActualScore(): Observable<Score> {
    return this.actualScoreSubject.asObservable();
  }

  public getGameOver(): Observable<boolean> {
    return this.gameOverSubject.asObservable();
  }

  public newGame() {
    // reset old game
    this.gameOverSubject.next(false);
  }

  public gameLoop(timestamp: number) {

    let progress = timestamp - this.lastTimestamp;

    if(progress > 1000 / this.actualScore.getGameSpeed()) {

      // check collision
      let potentialPosition = new PotentialPosition(this.movingTretromino.row + 1, this.movingTretromino.col);
      let collision = this.checkPossibleMoveCollision(potentialPosition);

      if(collision) {
        this.addTretrominoToLandedGrid(this.movingTretromino);
        this.removeCompleteLines();
        this.movingTretromino = this.tretrominoService.getNewTretromino();
      } else {
        this.movingTretromino.row = potentialPosition.row;
      }
      // draw new stuff
      this.landedGridSubject.next(this.landedGrid);
      this.redrawMovingTretromino();
      this.actualScoreSubject.next(this.actualScore);

      this.lastTimestamp = timestamp;

      if(this.isGameOver()) {
        this.gameOverSubject.next(true);
      }
    }
  }

  public handleUserMoveEvent(moveEvent: MoveEvents) {
    switch(moveEvent) {
      case MoveEvents.ROTATE_CLOCKWISE:
        this.rotateTretrominoClockWise();
        break;
      case MoveEvents.ROTATE_COUNTER_CLOCKWISE:
        this.rotateTretrominoCounterClockWise();
        break;
      case MoveEvents.RIGHT:
        this.moveTretrominoRight();
        break;
      case MoveEvents.LEFT:
        this.moveTretrominoLeft();
        break;
      case MoveEvents.DROP:
        this.dropTretromino();
        break;
      default: //nothing to do
    }
  }

  private checkPossibleMoveCollision(possibleNextPosition: PotentialPosition): boolean {
    let shape = this.movingTretromino.shape;
    let pieceCol = possibleNextPosition.col;
    let pieceRow = possibleNextPosition.row;
    return this.checkPossibleCollision(shape, pieceRow, pieceCol);
  }

  private checkPossibleRotationCollision(potentialShape: Array<Array<number>>): boolean {
    let shape = potentialShape;
    let pieceCol = this.movingTretromino.col;
    let pieceRow = this.movingTretromino.row;
    return this.checkPossibleCollision(shape, pieceRow, pieceCol);
  }

  private checkPossibleRotationCollisionWithPossibleCol(potentialShape: Array<Array<number>>, possibleCol: number): boolean {
    let shape = potentialShape;
    let pieceCol = possibleCol;
    let pieceRow = this.movingTretromino.row;
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
    let fullLines: number = 0;

    for (let rowIndex = 0; rowIndex < this.landedGrid.length; rowIndex++) {
      let row = this.landedGrid[rowIndex];
      if (row.filter((cell) => cell == 0).length == 0) {
        // row doenst contain 0 values -> row is complete
        this.landedGrid.splice(rowIndex, 1);
        this.landedGrid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        fullLines++;
      }
    }

    this.actualScore.increaseScore(fullLines);
  }

  private addTretrominoToLandedGrid(actualPiece: Tretromino) {
    for (let row = 0; row < actualPiece.shape.length; row++) {
      for (let col = 0; col < actualPiece.shape[row].length; col++) {
        if (actualPiece.shape[row][col] != 0) {
          this.landedGrid[row + actualPiece.row][col + actualPiece.col] = actualPiece.type.valueOf();
        }
      }
    }
  }

  private isGameOver(): boolean {
    // TODO: check if next tretromino can fit!? maybe turn it?
    return this.landedGrid[0].filter(values => values > 0).length > 0;
  }

  private rotateTretrominoClockWise() {
    let potentialShape = this.movingTretromino.getPotentialClockwiseShape();
    let collision = this.checkPossibleRotationCollision(potentialShape);

    if(!collision) {
      this.movingTretromino.rotateClockwise();
      this.redrawMovingTretromino();
    } else {
      this.checkRightBorderRotateCollision(potentialShape);
    }
  }

  private rotateTretrominoCounterClockWise() {
    let potentialShape = this.movingTretromino.getPotentialCounterClockwiseShape();
    let collision = this.checkPossibleRotationCollision(potentialShape);
    if(!collision) {
      this.movingTretromino.rotateCounterClockwise();
      this.redrawMovingTretromino();
    } else {
      this.checkRightBorderRotateCollision(potentialShape);
    }
  }

  private checkRightBorderRotateCollision(potentialShape: Array<Array<number>>) {
    if(this.movingTretromino.col + potentialShape[0].length >= this.landedGrid[0].length) {
      let potentialNewCol = potentialShape[0].length;
      let rightRotationCollision = this.checkPossibleRotationCollisionWithPossibleCol(potentialShape, potentialNewCol);
      if(!rightRotationCollision) {
        this.movingTretromino.rotateClockwise();
        this.movingTretromino.col = this.landedGrid[0].length - potentialShape[0].length;
        this.redrawMovingTretromino();
      }
    }
  }

  private moveTretrominoRight() {
    let potentialPosition = new PotentialPosition(this.movingTretromino.row, this.movingTretromino.col + 1);
    let collision = this.checkPossibleMoveCollision(potentialPosition);
    if(!collision) {
      this.movingTretromino.col = potentialPosition.col;
      this.redrawMovingTretromino();
    }
  }

  private moveTretrominoLeft() {
    let potentialPosition = new PotentialPosition(this.movingTretromino.row, this.movingTretromino.col - 1);
    let collision = this.checkPossibleMoveCollision(potentialPosition);
    if(!collision) {
      this.movingTretromino.col = potentialPosition.col;
      this.redrawMovingTretromino();
    }
  }

  private dropTretromino() {
    if(this.movingTretromino.row == 0) {
      return;
    }

    let potentialPosition = new PotentialPosition(this.movingTretromino.row + 1, this.movingTretromino.col);
    let collision = this.checkPossibleMoveCollision(potentialPosition);

    if(!collision) {
      this.movingTretromino.row = this.movingTretromino.row + 1;
      this.redrawMovingTretromino();
    }
  }

  private redrawMovingTretromino() {
    this.movingTretrominoSubject.next(this.movingTretromino);
  }
}
