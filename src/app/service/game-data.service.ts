import { Injectable } from '@angular/core';
import {LocalStoragePolyfillService} from "./local-storage-polyfill.service";
import {GameData} from "../models/GameData.model";
import {GAMESPEED} from "../models/GameSpeed";

@Injectable()
export class GameDataService {
  private gameData: GameData;

  constructor(private storagePolyfill: LocalStoragePolyfillService) {
    this.gameData = new GameData();
  }

  getGameSpeed(): GAMESPEED {
    return this.storagePolyfill.getGameSpeed();
  }
  setGameSpeed(speed: GAMESPEED) {
    this.storagePolyfill.setGameSpeed(speed);
  }
  getBestScore(): number {
    // return parseInt(localStoragePolyfill.getItem('game.bestScore'), 10) || 0;
    return this.storagePolyfill.loadBestScore();
  }
  setColor(color) {
    this.gameData.customColorChosen = color;
  }
  getColor() {
    return this.gameData.customColorChosen;
  }

  resetGameData() {
    this.gameData.gameStart = false;
    this.gameData.gamePause = false;
    this.gameData.gameEnd = false;
    this.gameData.score = 0;
  }

  getScore() {
    return this.gameData.score;
  }

  setGameStart() {
    this.gameData.gameStart = !this.gameData.gameStart;
  }

  setPause() {
    this.gameData.gamePause = !this.gameData.gamePause;
  }

  isPause() {
    return this.gameData.gamePause;
  }

  isGameStart() {
    return this.gameData.gameStart;
  }

  setGameEnd() {
    this.gameData.gameStart = false;
    this.gameData.gameEnd = true;
  }

  isGameOver() {
    return this.gameData.gameEnd;
  }

  increaseScore(byScore: number) {
    this.gameData.score += byScore;
  }

  getBoardWidth() {
    return this.gameData.gameBoard.boardWidth;
  }

  getRotationLimit() {
    return this.gameData.rotationLimit;
  }

  getBoardHeight() {
    return this.gameData.gameBoard.boardHeight;
  }

  getPatternLimit() {
    return this.gameData.patternLimit;
  }
}
