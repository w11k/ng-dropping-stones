/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {TretrominoService} from "./tretromino.service";

describe('TretrominoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TretrominoService]
    });
  });

  it('should ...', inject([TretrominoService], (service: TretrominoService) => {
    expect(service).toBeTruthy();
  }));
});
