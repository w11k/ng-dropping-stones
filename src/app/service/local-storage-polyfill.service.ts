import { Injectable } from '@angular/core';
import {GameSpeed} from "../models/GameSpeed";

@Injectable()
export class LocalStoragePolyfillService {

  private score: number = 0;
  private gameSpeed: GameSpeed = GameSpeed.BEGINNER;

  constructor() { }

  setBestScore(score: number) {
    this.score = score;
  }
  loadBestScore(): number {
    return this.score;
  }
  setGameSpeed(gameSpeed: GameSpeed) {
    this.gameSpeed = gameSpeed;
  }
  getGameSpeed(): GameSpeed {
    return this.gameSpeed;
  }
  setGameHistory(data: any, date: any) {
    // implement later on
  }
}
