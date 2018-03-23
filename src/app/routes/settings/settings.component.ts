import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state.model';
import {DeleteHighscoreAction, SettingsStore, UpdateSettingsAction} from '../../store/settingsReducer';
import {Observable} from 'rxjs/Observable';
import {untilComponentDestroyed} from 'ng2-rx-componentdestroyed';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  form: FormGroup;
  settings$: Observable<SettingsStore>;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {

    this.form = this.formBuilder.group({
      speed: null,
      forceReload: null
    });

    this.settings$ = this.store.pipe(select(state => state.settings));

    this.settings$
      .pipe(untilComponentDestroyed(this))
      .subscribe(it => this.form.patchValue(it, {onlySelf: true, emitEvent: false}));

    this.form.valueChanges
      .pipe(untilComponentDestroyed(this))
      .subscribe(it => this.store.dispatch(new UpdateSettingsAction(it)));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  deleteHighscore(): void {
    this.store.dispatch(new DeleteHighscoreAction());
  }

}
