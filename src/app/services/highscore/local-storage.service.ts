import { Injectable } from '@angular/core';
import { Score } from '../../models/highscore/highscore.model';
import { StorageService } from './storage.service';

// import { getDate } from 'date-fns'; // TODO: use

@Injectable()
export class LocalStorageService extends StorageService{

  constructor() {
    super();
    console.log('Started with Locale Storage Service');
    if (!storageAvailable('localStorage')) {
      alert('error, no local storage available');
    }
  }

  async getScores(): Promise<Score[]> {
    const score = JSON.parse(localStorage.getItem('highscore'));
    return score ? score as Score[] : [];
  }

  async getTodayScores(): Promise<Score[]> {
    return (await this.getScores())
      .filter(score =>
        new Date(score.date).toDateString() === new Date().toDateString()
      );
  }

  async getContestScores(): Promise<Score[]> {
    return (await this.getScores()).filter(score => score.acceptedTac);
  }

  async getTodayContestScores(): Promise<Score[]> {
    return (await this.getTodayScores()).filter(score => score.acceptedTac);
  }

  async getContestHighestScore(): Promise<number> {
    const allScores = await this.getContestScores();

    return allScores.length ? Math.max(...allScores.map(e => e.score)) : 0;
  }

  async getTodayHighestScore(): Promise<number> {
    const todayScores = await this.getTodayContestScores();

    return todayScores.length ? Math.max(...todayScores.map(e => e.score)) : 0;
  }

  readLocalHighscore(): Array<Score> {
    const score = JSON.parse(localStorage.getItem('highscore'));
    return score ? score as Score[] : [];
  }

  saveHighscore(currentPlayer: Score): void {
    const currentLocalStorage = this.readLocalHighscore();
    try {
      localStorage.setItem(
        'highscore',
        JSON.stringify(
          [...currentLocalStorage, currentPlayer]
        )
      );
    } catch (err) {
      console.error('Error while writing to local storage: ', err);
      throw err;
    }
  }

  deleteHighscore(): void {
    try {
      localStorage.setItem('highscore', JSON.stringify([]));
    } catch (err) {
      console.error('Error while deleting from local storage: ', err);
      throw err;
    }
  }

  getScoreLabel(score: Score): string {
    return `${score.score} ${score.name} (${score.email})`;
  }
}

const storageAvailable = type => {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
};
