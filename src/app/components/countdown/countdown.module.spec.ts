import { CountdownModule } from './countdown.module';

describe('CountdownModule', () => {
  let countdownModule: CountdownModule;

  beforeEach(() => {
    countdownModule = new CountdownModule();
  });

  it('should create an instance', () => {
    expect(countdownModule).toBeTruthy();
  });
});
