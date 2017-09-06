import {Injectable} from '@angular/core';
import {GameService} from './game.service';
import {Score, Highscore} from './model/score.model';
import * as _ from 'lodash';
import {Http, Response} from '@angular/http';
import {IHighscoreService} from './model/IHighscoreService';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

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
    const subject = new Subject();

    return this.gameService
      .getActualScore()
      .first()
      .map(score => {
        this.actualScore = score;
        const array = this.getHighscoreFromLocalStorage();
        array.push(score.getData());
        localStorage.setItem('ng2Tetris-Highscore', JSON.stringify(array));

        return subject;
      });
  }

  public getPlayerScore() {
    return this.actualScore;
  }

  public getHighscoreForToday(): Observable<any> {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let obj = this.getHighscoreFromLocalStorage();

    obj = _.filter(obj, (item) => {
      return new Date(item.createdAt) > startOfToday;
    });
    this.highscoreTodaySubject.next(obj);
    return this.highscoreTodaySubject.asObservable();
  }

  public getHighscoreAlltime(): Observable<any> {
    const obj = this.getHighscoreFromLocalStorage();

    this.highscoreAlltimeSubject.next(obj);
    return this.highscoreAlltimeSubject.asObservable();
  }

  public getHighestHighscore() {
    const obj = this.getHighscoreFromLocalStorage();
    this.highestHighScoreSubject.next(obj[0]);
    return this.highestHighScoreSubject.asObservable();
  }

  private getHighscoreFromLocalStorage(): Highscore[] {
    return this.extractDataAndSort(JSON.parse(localStorage.getItem('ng2Tetris-Highscore')));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private extractDataAndSort(res: Highscore[]) {
    return _.orderBy(res, ['score'], ['desc']) || [];
  }

  private handleError(error: any) {
    console.log(error);
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log(error);
    return Observable.throw(errMsg);
  }

  public playerNameExists(name: string): Observable<any> {
    const obj = this.getHighscoreFromLocalStorage();
    this.playerNameExistsSubject.next(_.find(obj, {'name': name}));
    return this.playerNameExistsSubject.asObservable();
  }
}
