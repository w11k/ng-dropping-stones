/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GamePieceComponent } from './game-piece.component';

describe('GamePieceComponent', () => {
  let component: GamePieceComponent;
  let fixture: ComponentFixture<GamePieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
