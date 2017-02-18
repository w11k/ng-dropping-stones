import { Injectable } from '@angular/core';
import {MovingPiece} from "./model/pieces/moving-piece.model";
import {BlockPiece} from "./model/pieces/block-piece.model";
import {LPiece} from "./model/pieces/l-piece.model";
import {Subject, ReplaySubject, Observable} from "rxjs";
import {PiecePosition} from "./model/piece-position.model";

@Injectable()
export class PieceService {

  private nextRandomPiece: MovingPiece;
  private nextRandomPieceShapeSubject: Subject<Array<Array<number>>>;
  private nextRandomPiecePositionSubject: Subject<PiecePosition>;

  constructor() {
    this.nextRandomPieceShapeSubject = new ReplaySubject<Array<Array<number>>>();
    this.nextRandomPiecePositionSubject = new ReplaySubject<PiecePosition>();

    this.generateNewRandomPiece();
  }

  getNextPieceShape(): Observable<Array<Array<number>>> {
    return this.nextRandomPieceShapeSubject.asObservable();
  }

  getNextPiecePosition(): Observable<PiecePosition> {
    return this.nextRandomPiecePositionSubject.asObservable();
  }

  getNewPiece(): MovingPiece {
    let newMovingPiece: MovingPiece = this.nextRandomPiece;
    this.generateNewRandomPiece();
    return newMovingPiece;
  }

  private generateNewRandomPiece() {
    let randomNumber = this.getRandomNumber(0, 2);

    switch (randomNumber) {
      case 0:
        this.nextRandomPiece = new LPiece();
        break;
      case 1:
        this.nextRandomPiece = new BlockPiece();
        break;
    }

    this.nextRandomPieceShapeSubject.next(this.nextRandomPiece.shape);
    this.nextRandomPiecePositionSubject.next(this.nextRandomPiece.calculateStyle());
  }

  // min inclusive, max exclusive
  private getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
