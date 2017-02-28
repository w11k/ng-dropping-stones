export class Score {

  private _score: number = 0;
  private _lines: number = 0;
  private _level: number = 0;

  public increaseScore(completeLines: number) {
    let points = 0;
    switch (completeLines) {
      case 1:
        points = 40 * (this._level + 1);
        break;
      case 2:
        points = 100 * (this._level + 1);
        break;
      case 3:
        points = 300 * (this._level + 1);
        break;
      case 4:
        points = 1200 * (this._level + 1);
        break;
    }

    this._score = this._score + points;
    this._lines = this._lines + completeLines;
    this._level = Math.floor(this._lines / 10);
  }


  get score(): number {
    return this._score;
  }

  get lines(): number {
    return this._lines;
  }

  get level(): number {
    return this._level;
  }

  public getGameSpeed() {
    return this._level + 1;
  }
}
