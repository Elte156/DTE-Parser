import { DynamicPeakRate } from './dynamic-peak-rate';

describe('DynamicPeakRate', () => {
  let sut: DynamicPeakRate;

  beforeEach(() => {
    sut = new DynamicPeakRate();
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });
});
