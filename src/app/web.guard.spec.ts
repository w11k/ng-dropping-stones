import { TestBed, async, inject } from '@angular/core/testing';

import { WebGuard } from './web.guard';

describe('WebGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebGuard]
    });
  });

  it('should ...', inject([WebGuard], (guard: WebGuard) => {
    expect(guard).toBeTruthy();
  }));
});
