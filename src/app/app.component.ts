import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state.model';
import { map, mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { interval } from 'rxjs/observable/interval';
import { Tetris, Status } from './game-logic/tetris/tetris.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TICK } from './store/tetrisReducer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  game$ = new BehaviorSubject<Tetris>(null);
  tick$: Observable<String>;

  constructor(private store: Store<AppState>) {
    store.pipe(
      map(state => state.game)
    ).subscribe(game => {
      this.game$.next(game);
      console.table(game.board);
    });
    this.tick$ = interval(500).pipe(
      mapTo('TICK')
    );
  }

  ngOnInit(): void {
    this.tick$.subscribe(() => {
      if (this.game$.value.status === Status.PLAYING) {
        this.store.dispatch({ type: TICK });
      } else {
        console.log('GAME OVER');
      }
    });
  }

}
