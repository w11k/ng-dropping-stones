import {Injectable} from '@angular/core';
import { Score } from '../../models/highscore/highscore.model';

@Injectable()
export abstract class StorageService {

  abstract getScores(): Score[];

  abstract getTodayScores(): Score[];

  abstract getContestScores(): Score[];

  abstract getTodayContestScores(): Score[];

  abstract getContestHighestScore(): number;

  abstract getTodayHighestScore(): number;

  abstract saveHighscore(currentPlayer: Score): void;

  abstract deleteHighscore(): void;
}
