import { Injectable } from '@angular/core';
import {MovingPiece} from "./model/pieces/moving-piece.model";
import {BlockPiece} from "./model/pieces/block-piece.model";
import {LPiece} from "./model/pieces/l-piece.model";
import {Subject, ReplaySubject, Observable} from "rxjs";

@Injectable()
export class PieceService {

  private nextRandomPiece: MovingPiece;
  private nextRandomPieceSubject: Subject<MovingPiece>;

  constructor() {
    this.generateNewRandomPiece();
    this.nextRandomPieceSubject = new ReplaySubject<MovingPiece>();

    this.nextRandomPieceSubject.next(this.nextRandomPiece);
  }

  getRandomPiece(): Observable<MovingPiece> {
    return this.nextRandomPieceSubject.asObservable();
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
  }

  // min inclusive, max exclusive
  private getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
