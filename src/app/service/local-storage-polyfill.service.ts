import { Injectable } from '@angular/core';
import {GAMESPEED} from "../models/GameSpeed";

@Injectable()
export class LocalStoragePolyfillService {

  private score: number = 0;
  private gameSpeed: GAMESPEED = GAMESPEED.BEGINNER;

  constructor() { }

  setBestScore(score: number) {
    this.score = score;
  }
  loadBestScore(): number {
    return this.score;
  }
  setGameSpeed(gameSpeed: GAMESPEED) {
    this.gameSpeed = gameSpeed;
  }
  getGameSpeed(): GAMESPEED {
    return this.gameSpeed;
  }
  setGameHistory(data: any, date: any) {
    // implement later on
  }
}
