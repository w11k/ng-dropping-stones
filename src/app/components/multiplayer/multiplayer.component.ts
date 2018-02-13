import { Component, OnInit } from '@angular/core';
import { Init } from '../../store/actions/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
})
export class MultiplayerComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new Init(2));
  }

}
