import { TestBed } from '@angular/core/testing';

import { FirebaseStorageService } from './firebase-storage.service';

describe('FirebaseStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseStorageService = TestBed.get(FirebaseStorageService);
    expect(service).toBeTruthy();
  });
});
