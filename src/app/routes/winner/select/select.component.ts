import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../services/highscore/local-storage.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Score} from '../../../models/highscore/highscore.model';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  form: FormGroup;
  todayContestScores: Score[];
  readonly web = environment.web;

  constructor(private storageService: LocalStorageService,
              private fb: FormBuilder,
              private router: Router,
              private db: AngularFireDatabase) {
  }

  ngOnInit() {
    if (this.web) {
      this.getHighscoresFromDB();
    } else {
      this.getHighscoresFromLocalStorage();
    }

    this.form = this.fb.group({
      winners: '',
    });
  }

  private getHighscoresFromLocalStorage() {
    this.todayContestScores = this.storageService.getTodayContestScores();
    this.todayContestScores.sort((a: Score, b: Score) => b.score - a.score);
  }

  private getHighscoresFromDB() {
    this.db.list('highscore')
      .valueChanges()
      .subscribe(highscores => {
        const todayHighscores: Score[] = highscores as Score[];
        // todays
        this.todayContestScores = todayHighscores
          .filter(highscore => new Date(highscore.date).toDateString() === new Date().toDateString())
          .sort((a: Score, b: Score) => b.score - a.score);
      });
  }

  onSubmit() {
    if (this.form.get('winners').value === '' || this.form.get('winners').value.length === 0) {
      alert('Please Select at least one Winner.');
      return;
    }

    const winners = this.form.get('winners').value;

    this.router.navigate(['/', 'winner', 'show'], { queryParams: { winners: JSON.stringify(winners) }});
  }

  getScoreLabel(score: Score): string {
    if (this.web) {
      return `${score.score} ${score.name}`;
    } else {
      return `${score.score} ${score.name} (${score.email})`;
    }
  }
}
