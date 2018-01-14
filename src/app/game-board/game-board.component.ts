import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Tetris } from '../game-logic/tetris/tetris.model';
import { map } from 'rxjs/operators';
import { TICK } from '../store/tetrisReducer';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  $game = new BehaviorSubject<Tetris>(null);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.pipe(
      map(state => state.game)
    ).subscribe(game => {
      this.$game.next(game);
      //render board
      console.table(game.board);
    });

    interval(200).subscribe(() => {
      if(this.$game.getValue().status === 'PLAYING') {
        this.store.dispatch({ type: TICK });
      }
    });

  }

}
