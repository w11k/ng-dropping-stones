import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoreListComponent } from './highscore-list.component';

describe('HighscoreListComponent', () => {
  let component: HighscoreListComponent;
  let fixture: ComponentFixture<HighscoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighscoreListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighscoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
