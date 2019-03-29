import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../services/highscore/local-storage.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Score} from '../../../models/highscore/highscore.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  form: FormGroup;
  todayContestScores: Score[];

  constructor(private storageService: LocalStorageService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.todayContestScores = this.storageService.getTodayContestScores();
    this.todayContestScores.sort((a: Score, b: Score) => b.score - a.score);
    this.form = this.fb.group({
      winners: '',
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
    return `${score.score} ${score.name} (${score.email})`;
  }
}