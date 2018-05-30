import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Score} from '../../models/highscore/highscore.model';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {

  winners$: Observable<Score[]>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.winners$ = this.route.queryParams.pipe(
      map(params => params['winners']),
      map(jsonString => JSON.parse(jsonString)),
    );
  }
}
