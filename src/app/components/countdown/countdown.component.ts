import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  counter: number;
  countdown$: Observable<number>;

  @Output() onFinished: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
    this.counter = 3;
    this.simulateCountdown();
  }

  simulateCountdown(): void {
    this.countdown$ = interval(1000)
      .pipe(
        map(() => --this.counter),
        tap(() => {
          if (this.counter === 0) {
            this.onFinished.emit();
          }
        }),
        startWith(3),
        untilComponentDestroyed(this)
      );
  }

  ngOnDestroy(): void {
  }

}
