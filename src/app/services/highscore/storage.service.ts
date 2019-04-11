import {Injectable} from '@angular/core';
import { Score } from '../../models/highscore/highscore.model';

@Injectable()
export abstract class StorageService {

  abstract getScores(): Promise<Score[]>;

  abstract getTodayScores(): Promise<Score[]>;

  abstract getContestScores(): Promise<Score[]>;

  abstract getTodayContestScores(): Promise<Score[]>;

  abstract getContestHighestScore(): Promise<number>;

  abstract getTodayHighestScore(): Promise<number>;

  abstract saveHighscore(currentPlayer: Score): void;

  abstract deleteHighscore(): void;

  abstract getScoreLabel(score: Score): string;
}
