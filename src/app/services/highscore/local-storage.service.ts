import {Injectable} from '@angular/core';
import {Score} from '../../models/highscore/highscore.model';
import {environment} from '../../../environments/environment';
// import { getDate } from 'date-fns'; // TODO: use

@Injectable()
export class LocalStorageService {

  constructor() {
    if (!storageAvailable('localStorage')) {
      alert('error, no local storage available');
    }
  }

  getScores(): Score[] {
    const score = JSON.parse(localStorage.getItem('highscore'));
    return score ? score as Score[] : [];
  }

  getTodayScores(): Score[] {
    return this.getScores()
      .filter(score =>
        new Date(score.date).toDateString() === new Date().toDateString()
      );
  }

  getContestScores(): Score[] {
    return this.getScores().filter(score => score.acceptedTac || environment.web);
  }

  getTodayContestScores(): Score[] {
    return this.getTodayScores().filter(score => score.acceptedTac || environment.web);
  }

  getContestHighestScore(): number {
    const allScores = this.getContestScores();

    return allScores.length ? Math.max(...allScores.map(e => e.score)) : 0;
  }

  getTodayHighestScore(): number {
    const todayScores = this.getTodayContestScores();

    return todayScores.length ? Math.max(...todayScores.map(e => e.score)) : 0;
  }

  readLocalHighscore(): Array<Score> {
    const score = JSON.parse(localStorage.getItem('highscore'));
    return score ? score as Score[] : [];
  }

  writeLocalHighscore(currentPlayer: Score): void {
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

  deleteLocalHighscore(): void {
    try {
      localStorage.setItem('highscore', JSON.stringify([]));
    } catch (err) {
      console.error('Error while deleting from local storage: ', err);
      throw err;
    }
  }

  // clearLocalStorage(): void {
  //   try {
  //     localStorage.clear();
  //   } catch (err) {
  //     console.error('Error while clearing local storage: ', err);
  //     throw err;
  //   }
  // }

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
