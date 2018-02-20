import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrominoComponent } from './tetromino.component';

describe('TetrominoComponent', () => {
  let component: TetrominoComponent;
  let fixture: ComponentFixture<TetrominoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetrominoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
