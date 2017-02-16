///<reference path="../models/Piece.model.ts"/>
import {Injectable} from "@angular/core";
import {Game} from "../models/Game.model";
import {GameDataService} from "./game-data.service";
import {GridService} from "./grid.service";
import {LocalStoragePolyfillService} from "./local-storage-polyfill.service";
import {Piece} from "../models/Piece.model";
import {KEYTYPE} from "./keyboard.service";

@Injectable()
export class GameManagerService {

  private game: Game;

  constructor(private gameDataService: GameDataService, private gridService: GridService,
              private storagePolyfill: LocalStoragePolyfillService) {
    this.game = new Game();
  }

  resetGame() {
    this.game.currentPiece = null;
    this.game.isNewRecord = false;
    this.gameDataService.resetGameData();
  }

  newGame() {
    this.resetGame();
    this.gridService.buildEmptyGameBoard();
  }

  saveGame() {
    // // piece
    // this.game.data.piece = {
    //   rotation: this.game.currentPiece.getRotation(),
    //   patterns: this.game.currentPiece.getPatternNumber()
    // };
    //
    // // grid
    // this.game.data.grid = this.gridService.getLandedGameGrid();
    //
    // // scroe
    // this.game.data.score = this.gameDataService.getScore();
    //
    // // custom piece
    // this.game.data.custom = this.game.currentPiece.getCustomPiece();
    // this.game.data.custom.color = this.gameDataService.getColor();
    //
    // GameData.savedGameTime = new Date();
    // this.game.data.date = GameData.savedGameTime.toJSON();
    //
    // localStoragePolyfill.setItem('game.history', game.data);
    // localStoragePolyfill.setItem('game.history.date', game.data.date);
    // return;
  }

  restoreGame() {
    // let data = localStoragePolyfill.getItem('game.history');
    // if (!_.isNull(data)) {
    //   this.game.data = data;
    //   this.game.currentPiece.setRotation(this.game.data.piece.rotation);
    //   this.game.currentPiece.setPatternNumber(this.game.data.piece.patterns);
    //   this.gridService.setGridService(this.game.data.grid);
    //   GameData.score = this.game.data.score;
    //   GameData.setColor(this.game.data.custom.color);
    //   this.game.currentPiece.setCustomPiece(this.game.data.custom);
    //   this.game.currentPiece.setPositionY(0);
    //   this.game.currentPiece.setPositionX(4);
    //   GameData.saveGameTime = new Date(this.game.data.date);
    // }
  }

  hasGameHistory() {
    // let data = localStoragePolyfill.getItem('game.history');
    // return !_.isNull(data);
  }

  getGameSavedTime() {
    // let date = localStoragePolyfill.getItem('game.history.date');
    // if (!_.isNull(date)) {
    //   let time = new Date(date);
    //   return time.toLocaleString();
    // } else {
    //   return null;
    // }
  }

  setGameStart() {
    this.gameDataService.setGameStart()
  }

  getGameSpeed() {
    return this.gameDataService.getGameSpeed();
  }

  setPause() {
    this.gameDataService.setPause();
  }

  isPause() {
    return this.gameDataService.isPause();
  }

  isGameStart() {
    return this.gameDataService.isGameStart();
  }

  gameOver() {
    this.saveBestScore();
    this.gameDataService.setGameEnd();
    this.setGameStart();
  }

  isGameEnd() {
    return this.gameDataService.isGameOver();
  }

  getIsOpenGameDesign() {
    return this.game.isOpenGameDesign;
  }

  setIsOpenGameDesign(isOpen) {
    this.game.isOpenGameDesign = isOpen;
  }

  getOpenDesignBeforeStart() {
    return this.game.openDesignBeforeStart;
  }

  setOpenDesignBeforeStart(isOpen) {
    this.game.openDesignBeforeStart = isOpen;
  }

  saveBestScore() {
    let score = this.gameDataService.getBestScore(),
      preScore = this.getScore();
    if (preScore > score) {
      this.game.isNewRecord = true;
      this.storagePolyfill.setBestScore(preScore);
    }
    return this.game;
  }

  getScore(): number {
    return this.gameDataService.getScore();
  }

  getBestScore(): number {
    return this.gameDataService.getBestScore();
  }

  getCurrentPiece() {
    return this.game.currentPiece;
  }

  getCurrentPattern() {
    return this.game.currentPiece.getPattern();
  }

  getCurrentShape() {
    return this.game.currentPiece.getShape();
  }

  rotatePiece(direction) {
    this.rotatePieceCheck(direction);
  }

  getPositionX(): number {
    return this.game.currentPiece.getPositionX();
  }

  getPositionY(): number {
    return this.game.currentPiece.getPositionY();
  }

  moveCurrentPiece() {
    let speedY = this.getPositionY() + 1;
    this.game.currentPiece.updatePosition({y: speedY}, this.insertAndClearRow());
  }

  insertPiece() {
    this.gridService.insertPiece(this.game.currentPiece, this.gameOver);
    this.game.currentPiece.destroy();
    this.game.currentPiece = null;
  }

  createNewPiece() {
    this.game.currentPiece = new Piece(4, 0,
      this.gameDataService.getRotationLimit(),
      this.gameDataService.getPatternLimit(),
      this.gameDataService.getBoardWidth(),
      this.gameDataService.getBoardHeight(),
      this.gridService);
  }

  getIsNewRecord() {
    return this.game.isNewRecord;
  }

  movePieceInLevel(direction) {
    let velocity = (direction === 'left') ? -1 : 1;
    let speedX = this.getPositionX() + velocity;
    this.game.currentPiece.updatePosition({x: speedX});
  }

  hardDrop() {
    let cell = this.game.currentPiece.calculateCollisionPoint();
    this.game.currentPiece.updatePosition(cell, this.insertAndClearRow());
  }

  updateGhostPiece() {
    if (this.game.currentPiece) {
      this.game.currentPiece.updateGhostPiece();
    }
  }

  move(key: KEYTYPE) {
    let rotateRight = 1,
      rotateLeft = -1;
    switch (key) {
      case KEYTYPE.UP:
        this.rotatePiece(rotateRight);
        break;
      case KEYTYPE.LEFT:
        this.movePieceInLevel('left');
        break;
      case KEYTYPE.RIGHT:
        this.movePieceInLevel('right');
        break;
      case KEYTYPE.DOWN:
        this.rotatePiece(rotateLeft);
        break;
      case KEYTYPE.DROP:
        this.hardDrop();
        break;
      case KEYTYPE.PAUSE:
      case KEYTYPE.ESCAPE:
        this.setPause();
        break;
      default:
        break;
    }
    this.updateGhostPiece();
  }

  updateGameSpeed(speed) {
    this.gameDataService.setGameSpeed(speed);
  }

  private insertAndClearRow() {
    this.insertPiece();
    this.gridService.checkAndClearFilledRow(() => {
      this.gameDataService.increaseScore(100);
    });
  }

  private getBoardWidth() {
    return this.gameDataService.getBoardWidth();
  }

  private moveCustomInLevel(velocity) {
    let speedX = this.getPositionX() + velocity;
    this.game.currentPiece.updatePosition({x: speedX});
  }

  private rotatePieceCheck(direction) {
    let oldRotation = this.game.currentPiece.getRotation(),
      newRotation = oldRotation + direction;
    let rotationLimit = this.gameDataService.getRotationLimit();
    this.game.currentPiece.setRotation(newRotation < 0 ? newRotation + rotationLimit : newRotation % rotationLimit);

    let coord = this.game.currentPiece.convertPatternToCoordinates();
    for (let i = 0, len = coord.length; i < len; i++) {
      if (!this.game.currentPiece.withinGrid(coord[i])) {
        if (coord[i].x < 0) {
          this.movePieceInLevel('right');
          break;
        }
        if (coord[i].x >= this.getBoardWidth()) {
          this.movePieceInLevel('left');
          if (this.game.currentPiece.getPatternNumber() === 2) {
            if (coord[i + 1] && coord[i + 1].x >= this.getBoardWidth()) {
              this.moveCustomInLevel(-2);
            }
            break;
          } else {
            break;
          }
        }
        if (!this.game.currentPiece.verifyPiece()) {
          this.game.currentPiece.setRotation(oldRotation);
          break;
        }
      }
    }
  }

  startNewGame() {
    this.createNewPiece();
    this.setGameStart();
//    this.keyboardService.on(function (key) {
//      this.GameManager.move(key);
//    });
  }
}
