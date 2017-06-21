/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {GameComponent, GameAppComponent} from './game-app.component';
import {GameConfigComponent} from "./game-config.component";

describe('GameConfigComponent', () => {
  let component: GameAppComponent;
  let fixture: ComponentFixture<GameConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameConfigComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
