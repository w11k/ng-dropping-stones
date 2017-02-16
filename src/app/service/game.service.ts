import { Injectable } from '@angular/core';
import {Subject, Observable, ReplaySubject} from "rxjs";

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
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0]
  ];

  private movingPiece: Array<number> = [
    1, 1, 0, 0,
    1, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
  ];

  private gameSpeed: number = 10;
  private lastTimestamp: number = 0;

  private movingPieceStyle: Style = new Style(0, 10);

  private landedGridSubject: Subject<Array<Array<number>>>;
  private movingPieceSubject: Subject<Array<number>>;
  private movingPieceStyleSubject: Subject<Style>;

  constructor() {
    this.landedGridSubject = new ReplaySubject<Array<Array<number>>>();
    this.movingPieceSubject = new ReplaySubject<Array<number>>();
    this.movingPieceStyleSubject = new ReplaySubject<Style>();

    this.landedGridSubject.next(this.landedGrid);
    this.movingPieceSubject.next(this.movingPiece);
    this.movingPieceStyleSubject.next(this.movingPieceStyle);
  }

  public getLandedGameGrid(): Observable<Array<Array<number>>> {
    return this.landedGridSubject.asObservable();
  }

  public getMovingPiece(): Observable<Array<number>> {
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
      // update stuff
      this.movingPieceStyle.top = this.movingPieceStyle.top + 25;

      // draw new stuff
      this.movingPieceStyleSubject.next(this.movingPieceStyle);

      this.lastTimestamp = timestamp;
      console.log("gameLoop");
    }
  }
}

export class Style {
  constructor(public top: number, public left: number) {}
}
