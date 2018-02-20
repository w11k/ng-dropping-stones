import { inject, TestBed } from '@angular/core/testing';

import { SinglePlayerGuard } from './single-player.guard';

describe('SinglePlayerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SinglePlayerGuard]
    });
  });

  it('should ...', inject([SinglePlayerGuard], (guard: SinglePlayerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
