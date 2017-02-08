/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnimFramePolyfillService } from './anim-frame-polyfill.service';

describe('AnimFramePolyfillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimFramePolyfillService]
    });
  });

  it('should ...', inject([AnimFramePolyfillService], (service: AnimFramePolyfillService) => {
    expect(service).toBeTruthy();
  }));
});
