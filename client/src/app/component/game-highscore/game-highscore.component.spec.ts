/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {GameHighscoreComponent} from './game-highscore.component';

describe('GameComponent', () => {
  let component: GameHighscoreComponent;
  let fixture: ComponentFixture<GameHighscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameHighscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameHighscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
