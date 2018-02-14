import { inject, TestBed } from '@angular/core/testing';

import { GamepadService } from './gamepad.service';

describe('GamepadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamepadService]
    });
  });

  it('should be created', inject([GamepadService], (service: GamepadService) => {
    expect(service).toBeTruthy();
  }));
});
