import { Injectable } from '@angular/core';
import { Person, Score } from '../../models/highscore/highscore.model';
import { getDate } from 'date-fns';

@Injectable()
export class HighscoreService {

  private name: string;
  private email: string;

  constructor() {
    if (!storageAvailable('localStorage')) {
      alert('error, no local storage available');
    }
  }

  hasName(): boolean {
    return !!this.name;
  }

  get playerName(): string {
    return this.name;
  }

  get playerScoreObject(): Object {
    return {
      name: this.name,
      email: this.email,
      score: this.getScores(),
      date: getDate(new Date())
    };
  }

  setPerson(person: Person) {
    this.name = person.name;
    this.email = person.email;
  }

  getScores(): Score[] {
    const score = JSON.parse(localStorage.getItem('highscore'));
    return score ? score as Score[] : [];
  }

  getTodaysScores(): Score[] {
    return this.getScores()
      .filter(score =>
        new Date(score.date).toDateString() === new Date().toDateString()
      );
  }

  setScore(score: number) { // TODO: refactor with store/action
    const scores = this.getScores();
    const date = new Date().toString();
    scores.push({
      name: this.name,
      email: this.email,
      score,
      date
    });
    localStorage.setItem('highscore', JSON.stringify(scores));
  }

  deleteHighscore(): void {
    localStorage.setItem('highscore', JSON.stringify([]));
  }

  deleteTotal(): void { // DEBUG
    localStorage.clear();
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
