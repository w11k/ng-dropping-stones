import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/highscore/local-storage.service';
import {throttleTime} from 'rxjs/operators';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {PlayerState} from '../../store/reducers/highscore.reducer';
import {Store} from '@ngrx/store';
import {SaveHighscore} from '../../store/actions';
import {Subscription} from 'rxjs';
import {TacComponent} from './tac/tac.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss'],
})
export class EnterNameComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren('action') actions: QueryList<ElementRef>;

  nameForm: FormGroup;
  private selectedElementRef: ElementRef;
  private ESCSubscription: Subscription;

  constructor(private router: Router,
              private playerStore: Store<PlayerState>,
              private score: LocalStorageService,
              private gamepad: GamepadService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.nameForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      acceptTac: new FormControl(false),
      acceptNewsletter: new FormControl(false),
    }, [EmailAndTACValidator('email', 'acceptTac')]);

    this.gamepad.getActions(1).pipe(
      throttleTime(300),
      untilComponentDestroyed(this)
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

    this.ESCSubscription = this.gamepad.abortGame();
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
    this.focusInput('name');
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
    this.ESCSubscription.unsubscribe();
  }

  submit() {
    if (this.nameForm.invalid) {
      if (this.nameForm.get('name').invalid) {
        this.focusInput('name');
      } else if (this.nameForm.get('email').dirty && this.nameForm.get('email').value.length > 0) {
        if (this.nameForm.get('email').invalid) {
          this.focusInput('email');
        } else if (this.nameForm.errors['tacMustBeSet']) {
          this.focusInput('acceptTac');
        }
      }
      return;
    }
    this.playerStore.dispatch(
      new SaveHighscore({
        name: this.nameForm.get('name').value,
        email: this.nameForm.get('email').value,
        acceptedTac: this.nameForm.get('acceptTac').value,
        acceptNewsletter: this.nameForm.get('acceptNewsletter').value,
        score: 0,
        date: new Date().toDateString()
      })
    );
  }

  // type=1 for color orange, type=2 for color white
  colorLabel(id: string, type: number) {
    if (type === 1) {
      document.getElementById(`${id}label`).style.color = '#ee5d26';
    } else if (type === 2) {
      document.getElementById(`${id}label`).style.color = '#eee';
    } else {
      console.log('Invalid type');
    }
  }

  openTac(event: MouseEvent) {
    event.preventDefault();
    this.modalService.open(TacComponent, {size: 'lg', centered: true});
  }

  private focusInput(inputId: string) {
    const input = this.actions.filter(action => action.nativeElement.getAttribute('id') === inputId)[0];

    if (input) {
      this.selectedElementRef = input;
      this.selectedElementRef.nativeElement.focus();
      if (inputId === 'email') {
        this.selectedElementRef.nativeElement.select();
      }
    }
  }

  private getActions(): ElementRef[] {
    return this.actions.map(elementRef => elementRef);
  }
}

export function EmailAndTACValidator(emailControlName: string, tacControlName: string) {
  return (group: FormGroup) => {
    const emailControl = group.controls[emailControlName];
    const tacControl = group.controls[tacControlName];

    return emailControl.dirty && !tacControl.value ? {'tacMustBeSet': true} : null;
  };
}
