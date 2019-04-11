import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Score } from '../../models/highscore/highscore.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';

@Injectable()
export class FirebaseStorageService extends StorageService {

  constructor(private db: AngularFireDatabase) {
    super();
    console.log('Started with Firebase Storage Service');
  }

  deleteHighscore(): void {
    // not implemented for firebase
  }

  async getContestHighestScore(): Promise<number> {
    const descScores = (await this.getContestScores()).sort(((a, b) => b.score - a.score)).map(value => value.score);

    return descScores.length > 0 ? descScores[0] : 0;
  }

  async getContestScores(): Promise<Score[]> {
    return this.db.list<Score>('highscore')
      .valueChanges()
      .pipe(
        take(1),
      ).toPromise();
  }

  getTodayContestScores(): Promise<Score[]> {
    return this.db.list<Score>('highscore')
      .valueChanges()
      .pipe(
        take(1),
        map(scores  => scores.filter(highscore => new Date(highscore.date).toDateString() === new Date().toDateString()))
      ).toPromise();
  }

  async getTodayHighestScore(): Promise<number> {
    const descScores = (await this.getTodayContestScores()).sort(((a, b) => b.score - a.score)).map(value => value.score);

    return descScores.length > 0 ? descScores[0] : 0;
  }

  saveHighscore(currentPlayer: Score): void {
    this.db.database.ref('highscore').push(currentPlayer);
  }

  getScoreLabel(score: Score): string {
    return `${score.score} ${score.name}`;
  }
}
