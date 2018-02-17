import { TestBed, inject } from '@angular/core/testing';

import { HighscoreService } from './highscore.service';

describe('HighscoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighscoreService]
    });
  });

  it('should be created', inject([HighscoreService], (service: HighscoreService) => {
    expect(service).toBeTruthy();
  }));
});
