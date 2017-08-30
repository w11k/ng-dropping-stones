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
    console.log("constructor configService");
  }

  init(config) {
    console.log("init configService with", config);
    this.defaultConfig = config;
    this.config = this.loadDataFromLocalStorage();
    console.log(this.config);
    this.saveGameOptions(this.config);
  }

  saveGameOptions(config: GameConfig): void {
    console.log("save", config);
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
