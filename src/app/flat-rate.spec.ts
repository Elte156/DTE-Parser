import { FlatRate } from './flat-rate';

describe('FlatRate', () => {
  const mockRate = 0.19;
  let sut: FlatRate;

  beforeEach(() => {
    sut = new FlatRate(mockRate);
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });
});
