import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GamepadService } from '../../services/gamepad/gamepad.service';
import { GamepadActions } from '../../models/gamepad/gamepad.model';
import { Subscription } from 'rxjs/Subscription';
import { throttleTime } from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('singleplayer') singleplayer: ElementRef;
  @ViewChild('multiplayer') multiplayer: ElementRef;
  navigationSubscription: Subscription;

  constructor(private gamepad: GamepadService, private router: Router) {
  }

  ngOnInit(): void {
    this.navigationSubscription = this.gamepad.getAllActions().pipe(
      throttleTime(300)
    ).subscribe(action => {
      if (action === GamepadActions.RIGHT || action === GamepadActions.LEFT) {
        this.focusNext();
      }
      if (action === GamepadActions.SELECT) {
        this.clickFocused();
      }
      if (action === GamepadActions.HIGHSCORE) {
        this.router.navigate(['/highscore']);
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
    this.navigationSubscription.unsubscribe();
  }

}
