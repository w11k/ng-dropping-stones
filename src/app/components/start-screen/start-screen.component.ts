import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GamepadService } from '../../services/gamepad/gamepad.service';
import { GamepadActions } from '../../models/gamepad/gamepad.model';
import { merge, throttleTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('singleplayer') singleplayer: ElementRef;
  @ViewChild('multiplayer') multiplayer: ElementRef;
  navigationSubscription: Subscription;

  constructor(private gamepad: GamepadService) {
  }

  ngOnInit(): void {
    this.navigationSubscription = this.gamepad.getActions(1).pipe(
      merge(this.gamepad.getActions(2)),
      throttleTime(300)
    ).subscribe(action => {
      if (action === GamepadActions.Right || action === GamepadActions.Left) {
        this.focusNext();
      }
      if (action === GamepadActions.Select) {
        this.clickFocused();
      }
    });
  }

  ngAfterViewInit(): void {
    this.singleplayer.nativeElement.focus();
  }

  focusNext() {
    const element = document.activeElement;
    const tabable = Array.from(document.querySelectorAll('a.tabable')) as HTMLElement[];
    tabable.filter(t => t !== element)[0].focus();
  }

  clickFocused() {
    (<HTMLElement>document.activeElement).click();
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe()
  }

}
