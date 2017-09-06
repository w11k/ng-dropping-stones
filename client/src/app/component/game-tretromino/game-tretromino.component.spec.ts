/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {GameTretrominoComponent} from './game-tretromino.component';

describe('GameTretrominoComponent', () => {
  let component: GameTretrominoComponent;
  let fixture: ComponentFixture<GameTretrominoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTretrominoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTretrominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
