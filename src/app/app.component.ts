import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { Tetris } from './game-logic/tetris/tetris.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TICK } from './store/tetrisReducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  game$: Observable<Tetris>;

  constructor(private store: Store<AppState>) {
    this.game$ = store.pipe(
      map(state => state.game)
    );
    this.game$.subscribe(state => console.table(state.board));
  }

  ngOnInit(): void {
    interval(200).subscribe(() => {
      this.store.dispatch({type: TICK});
    });
  }

}
