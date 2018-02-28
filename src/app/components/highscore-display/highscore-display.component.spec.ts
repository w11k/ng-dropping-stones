import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoreDisplayComponent } from './highscore-display.component';

describe('HighscoreDisplayComponent', () => {
  let component: HighscoreDisplayComponent;
  let fixture: ComponentFixture<HighscoreDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighscoreDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighscoreDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
