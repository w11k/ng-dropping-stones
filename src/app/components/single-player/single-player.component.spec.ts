import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlayerComponent } from './single-player.component';
import { GameControllerModule } from '../game-controller/game-controller.module';
import { StoreModule } from '@ngrx/store';
import { tetrisReducer } from '../../store/tetrisReducer';

describe('SinglePlayerComponent', () => {
  let component: SinglePlayerComponent;
  let fixture: ComponentFixture<SinglePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePlayerComponent],
      imports: [
        GameControllerModule,
        StoreModule.forRoot({ game: tetrisReducer })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
