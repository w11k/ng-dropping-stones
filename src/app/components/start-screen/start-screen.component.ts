import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GamepadService} from '../../services/gamepad/gamepad.service';
import {GamepadActions} from '../../models/gamepad/gamepad.model';
import {debounceTime, filter, takeUntil, throttleTime} from 'rxjs/operators';
import {Router} from '@angular/router';
import {componentDestroyed} from 'ng2-rx-componentdestroyed';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('action') actions: QueryList<ElementRef>;
  private selectedElementRef: ElementRef;

  constructor(private gamepad: GamepadService, private router: Router) {
  }

  ngOnInit(): void {
    this.gamepad.getActions(1).pipe(
      throttleTime(300),
      takeUntil(componentDestroyed(this))
    ).subscribe(action => {
      if (action === GamepadActions.RIGHT) {
        this.focusNext();
      } else if (action === GamepadActions.LEFT) {
        this.focusPrev();
      }
    });

    this.gamepad.getActions(1).pipe(
      debounceTime(280),
      takeUntil(componentDestroyed(this)),
      filter(it => it === GamepadActions.OK)
    ).subscribe(action => {
      this.clickFocused();
    });


  }

  ngAfterViewInit(): void {
    this.selectedElementRef = this.actions.first;
    this.selectedElementRef.nativeElement.focus();
  }

  focusNext() {
    const availableActions = this.getActions();
    const selectedIndex = availableActions.indexOf(this.selectedElementRef);

    if (selectedIndex + 1 === availableActions.length) {
      this.selectedElementRef = availableActions[0];
    } else {
      this.selectedElementRef = availableActions[selectedIndex + 1];
    }

    this.selectedElementRef.nativeElement.focus();
  }

  focusPrev() {
    const availableActions = this.getActions();
    const selectedIndex = availableActions.indexOf(this.selectedElementRef);

    if (selectedIndex === 0) {
      this.selectedElementRef = availableActions[availableActions.length - 1];
    } else {
      this.selectedElementRef = availableActions[selectedIndex - 1];
    }

    this.selectedElementRef.nativeElement.focus();
  }

  clickFocused() {
    (<HTMLElement>document.activeElement).click();
  }

  ngOnDestroy(): void {
  }

  private getActions(): ElementRef[] {
    return this.actions.map(elementRef => elementRef);
  }
}
