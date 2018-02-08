import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameControllerComponent } from './game-controller.component';

describe('GameControllerComponent', () => {
  let component: GameControllerComponent;
  let fixture: ComponentFixture<GameControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
