import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { GamepadService } from '../../services/gamepad/gamepad.service';
import { GamepadActions } from '../../models/gamepad/gamepad.model';
import { Subscription } from 'rxjs/Subscription';
import { throttleTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('action') actions: QueryList<ElementRef>;
  private selectedElementRef: ElementRef;
  navigationSubscription: Subscription;

  constructor(private gamepad: GamepadService, private router: Router) {
  }

  ngOnInit(): void {
    this.navigationSubscription = this.gamepad.getAllActions().pipe(
      throttleTime(300)
    ).subscribe(action => {
      if (action === GamepadActions.RIGHT) {
        this.focusNext();
      } else if (action === GamepadActions.LEFT) {
        this.focusPrev();
      } else if (action === GamepadActions.SELECT) {
        this.clickFocused();
      } else if (action === GamepadActions.HIGHSCORE) {
        this.router.navigate(['/highscore']);
      }
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
    this.navigationSubscription.unsubscribe();
  }

  private getActions(): ElementRef[] {
    return this.actions.map(elementRef => elementRef);
  }
}
