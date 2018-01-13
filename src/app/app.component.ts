import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/state.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Tetris } from './game-logic/tetris/tetris.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  game$: Observable<Tetris>;

  constructor(private store: Store<AppState>) {
    this.game$ = store.pipe(
      map(state => state.game)
    );
    this.game$.subscribe(console.log);
  }
}
