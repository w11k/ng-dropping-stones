import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiGameOverComponent } from './multi-game-over.component';

describe('MultiGameOverComponent', () => {
  let component: MultiGameOverComponent;
  let fixture: ComponentFixture<MultiGameOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiGameOverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiGameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
