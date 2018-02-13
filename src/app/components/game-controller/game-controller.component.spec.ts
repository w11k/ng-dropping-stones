import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameControllerComponent } from './game-controller.component';
import { GameBoardModule } from '../game-board/game-board.module';
import { StoreModule, Store } from '@ngrx/store';
import { tetrisReducer } from '../../store/tetrisReducer';
import { AppState } from '../../store/state.model';
import { Init } from '../../store/actions/actions';

describe('GameControllerComponent', () => {
  let component: GameControllerComponent;
  let fixture: ComponentFixture<GameControllerComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameControllerComponent],
      imports: [
        GameBoardModule,
        StoreModule.forRoot({ game: tetrisReducer })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameControllerComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    store.dispatch(new Init(1));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
