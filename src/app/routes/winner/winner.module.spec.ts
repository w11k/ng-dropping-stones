import { WinnerModule } from './winner.module';

describe('WinnerModule', () => {
  let winnerModule: WinnerModule;

  beforeEach(() => {
    winnerModule = new WinnerModule();
  });

  it('should create an instance', () => {
    expect(winnerModule).toBeTruthy();
  });
});
