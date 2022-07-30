import { TimeOfDayRate } from './time-of-day-rate';

describe('TimeOfDayRate', () => {
  let sut: TimeOfDayRate;

  beforeEach(() => {
    sut = new TimeOfDayRate();
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });
});
