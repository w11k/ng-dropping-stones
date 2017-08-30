export interface Highscore {
  name: string;
  email: string;
  level: number;
  score: number;
  lines: number;
  createdAt: any;
}

export class Score {

  private _score: number = 0;
  private _lines: number = 0;
  private _level: number = 0;
  private _name: string = '';
  private _email: string = '';
  private _createdAt: Date = new Date();

  private _incLevelPerLine: number = 10; // increase level every X lines
  private _gameSpeedModifier: number = 2;  // game speed

  public increaseScore(completedLines: number) { // more points for more completed lines
    let points = 0;
    switch (completedLines) {
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
    this._lines = this._lines + completedLines;
    this._level = Math.floor(this._lines / this._incLevelPerLine);
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

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  set incLevelPerLine(value: number) {
    this._incLevelPerLine = value;
  }

  set gameSpeedModifier(value: number) {
    this._gameSpeedModifier = value;
  }

  get incLevelPerLine(): number {
    return this._incLevelPerLine;
  }

  get gameSpeedModifier(): number {
    return this._gameSpeedModifier;
  }

  public getData(): Highscore {
    return {
      name: this._name,
      email: this._email,
      level: this._level,
      score: this._score,
      lines: this._lines,
      createdAt: this._createdAt
    }
  }

  public getGameSpeed() {
    return this._level + this._gameSpeedModifier;
  }
}
