import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {takeUntil, throttleTime} from 'rxjs/operators';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {componentDestroyed} from 'ng2-rx-componentdestroyed';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PlayerState} from '../../store/reducers/highscore.reducer';
import {Store} from '@ngrx/store';
import {SaveHighscore} from '../../store/actions';

const animationDuration = 300;

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.5)'
      })),
      transition('inactive => active', animate(animationDuration + 'ms ease-in')),
      transition('active => inactive', animate(animationDuration * 2 + 'ms ease-out'))
    ]),
  ]
})
export class EnterNameComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren('action') actions: QueryList<ElementRef>;
  animated: 'inactive' | 'active' = 'inactive';

  nameForm: FormGroup;
  private selectedElementRef: ElementRef;

  constructor(private router: Router,
              private playerStore: Store<PlayerState>,
              private score: LocalStorageService,
              private gamepad: GamepadService) {
  }

  ngOnInit() {
    this.nameForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('')
    });

    this.gamepad.getActions(1).pipe(
      takeUntil(componentDestroyed(this)),
      throttleTime(300),
    ).subscribe(action => {
      switch (action) {
        case GamepadActions.BACK:
          this.focusPrev();
          break;
        case GamepadActions.LEFT:
          this.focusPrev();
          break;
        case GamepadActions.UP:
          this.focusPrev();
          break;
        case GamepadActions.DOWN:
          this.focusNext();
          break;
        case GamepadActions.RIGHT:
          this.focusNext();
          break;
        case GamepadActions.OK:
          this.focusNext();
          break;
      }
    });
  }

  focusNext() {
    const availableActions = this.getActions();
    const selectedIndex = availableActions.indexOf(this.selectedElementRef);

    if (selectedIndex + 1 === availableActions.length) {
      this.submit();
    } else {
      this.selectedElementRef = availableActions[selectedIndex + 1];
    }

    this.selectedElementRef.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.selectFirst();
  }

  focusPrev() {
    const availableActions = this.getActions();
    const selectedIndex = availableActions.indexOf(this.selectedElementRef);
    if (selectedIndex === 0) {
      // if back pressed on the first focus
      // element, navigate back to start.
      this.router.navigate(['/']);
      return;
    } else {
      // just go to the previous focusable action
      this.selectedElementRef = availableActions[selectedIndex - 1];
    }
    this.selectedElementRef.nativeElement.focus();
  }

  ngOnDestroy(): void {
  }

  submit(form: FormGroup = this.nameForm) {
    if (form.invalid) {
      this.selectFirst();
      this.animate();
      return;
    }
    this.playerStore.dispatch(
      new SaveHighscore({
          name: form.value.name,
          email: form.value.email,
          score: 0,
          date: new Date().toDateString()
      })
    );
  }

  // there must be a way to do this nicer ...
  animate() {
    this.animated = 'active';
    setTimeout(() => this.animated = 'inactive', animationDuration);
  }

  private selectFirst() {
    this.selectedElementRef = this.actions.first;
    this.selectedElementRef.nativeElement.focus();
  }

  private getActions(): ElementRef[] {
    return this.actions.map(elementRef => elementRef);
  }
}
