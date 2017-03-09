import {Score} from "./score.model";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

export interface IHighscoreService {
  actualScore: Score;

  saveHighscore(): Observable<any>;

  getHighscoreForToday(): Observable<any>;

  getHighscoreAlltime(): Observable<any>;

  playerNameExists(name: string): Observable<any>;
}
