import {Injectable} from '@angular/core';
import {GameService} from "./game.service";
import {Score, Highscore} from "./model/score.model";
import * as _ from "lodash";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {IHighscoreService} from "./model/IHighscoreService";

@Injectable()
export class HighscoreService implements IHighscoreService {
  actualScore: Score;

  constructor(private gameService: GameService,
              private http: Http) {
    console.log("HighscoreService init");
  }

  public saveHighscore(): Observable<any> {
    return this.gameService
      .getActualScore()
      .first()
      .map(score => {
        return this.http.post('/api/highscore/add', score.getData())
          .map(this.extractData)
          .catch(this.handleError);
      });
  }

  public getPlayerScore() {
    return this.actualScore;
  }

  public getHighscoreForToday(): Observable<any> {
    return this.http.get('/api/highscore/get')
      .map(this.extractDataAndSort)
      .catch(this.handleError);
  }

  public getHighscoreAlltime(): Observable<any> {
    return this.http.get('/api/highscore/get/all')
      .map(this.extractDataAndSort)
      .catch(this.handleError);
  }

  public getHighestHighscore(): any {

  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  extractDataAndSort(res: Response) {
    let body = res.json();
    return _.orderBy(body, ['score'], ['desc']) || {};
  }

  handleError(error: any) {
    console.log(error);
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.log(error);
    return Observable.throw(errMsg);
  }

  playerNameExists(name: string): Observable<any> {
    return this.http.post('/api/highscore/get/byName', {name: name})
      .map(this.extractData)
      .catch(this.handleError);
  }
}
