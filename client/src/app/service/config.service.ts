import {Injectable} from '@angular/core';

export class GameConfig {
  incLevelPerLine: number;
  gameSpeedModifier: number;
  initalMoveInterval: number;
  forceReload: boolean
}

@Injectable()
export class ConfigService {
  private defaultConfig: GameConfig;
  private config: GameConfig;

  constructor() {
  }

  init(config) {
    this.defaultConfig = config;
    this.config = this.loadDataFromLocalStorage();
    this.saveGameOptions(this.config);
  }

  saveGameOptions(config: GameConfig): void {
    this.config = config;
    localStorage.setItem("ng2Tetris-Config", JSON.stringify(config));
  }

  getGameConfig(): GameConfig {
    return this.config;
  }

  private loadDataFromLocalStorage(): GameConfig {
    let savedData: GameConfig = JSON.parse(localStorage.getItem("ng2Tetris-Config"));
    return savedData ? savedData : this.defaultConfig;
  }
}
