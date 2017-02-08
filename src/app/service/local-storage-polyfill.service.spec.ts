/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStoragePolyfillService } from './local-storage-polyfill.service';

describe('LocalStoragePolyfillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStoragePolyfillService]
    });
  });

  it('should ...', inject([LocalStoragePolyfillService], (service: LocalStoragePolyfillService) => {
    expect(service).toBeTruthy();
  }));
});
