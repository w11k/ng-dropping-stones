import {Injectable} from '@angular/core';
import {GameService} from "./game.service";
import {Score, Highscore} from "./model/score.model";
import * as _ from "lodash";
import {Http, Response} from "@angular/http";
import {Observable, Subject, ReplaySubject} from "rxjs";
import {IHighscoreService} from "./model/IHighscoreService";

@Injectable()
export class HighscoreLocalStorageService implements IHighscoreService {
  actualScore: Score;

  highscoreTodaySubject = new ReplaySubject(1);
  highscoreAlltimeSubject = new ReplaySubject(1);
  highestHighScoreSubject = new ReplaySubject(1);

  playerNameExistsSubject = new Subject();

  constructor(private gameService: GameService,
              private http: Http) {
  }

  public saveHighscore(): Observable<any> {
    let subject = new Subject();

    return this.gameService
      .getActualScore()
      .first()
      .map(score => {
        this.actualScore = score;
        let array = this.getHighscoreFromLocalStorage();
        array.push(score.getData());
        localStorage.setItem('ng2Tetris-Highscore', JSON.stringify(array));

        return subject;
      });
  }

  public getPlayerScore() {
    return this.actualScore;
  }

  public getHighscoreForToday(): Observable<any> {
    let now = new Date();
    let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let obj = this.getHighscoreFromLocalStorage();

    obj = _.filter(obj, (item) => {
      return new Date(item.createdAt) > startOfToday
    });
    this.highscoreTodaySubject.next(obj);
    return this.highscoreTodaySubject.asObservable();
  }

  public getHighscoreAlltime(): Observable<any> {
    let obj = this.getHighscoreFromLocalStorage();

    this.highscoreAlltimeSubject.next(obj);
    return this.highscoreAlltimeSubject.asObservable();
  }

  public getHighestHighscore() {
    let obj = this.getHighscoreFromLocalStorage();
    this.highestHighScoreSubject.next(obj[0]);
    return this.highestHighScoreSubject.asObservable();
  };

  private getHighscoreFromLocalStorage(): Highscore[] {
    return this.extractDataAndSort(JSON.parse(localStorage.getItem('ng2Tetris-Highscore')));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private extractDataAndSort(res: Highscore[]) {
    return _.orderBy(res, ['score'], ['desc']) || [];
  }

  private handleError(error: any) {
    console.log(error);
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log(error);
    return Observable.throw(errMsg);
  }

  public playerNameExists(name: string): Observable<any> {
    let obj = this.getHighscoreFromLocalStorage();
    this.playerNameExistsSubject.next(_.find(obj, {'name': name}));
    return this.playerNameExistsSubject.asObservable();
  }
}
