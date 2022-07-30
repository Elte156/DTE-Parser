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

  it('should get the rate name for any datetime', () => {
    const input = new Date();
    const expected = 'Flat Rate';
    const actual = sut.getRateName(input);
    expect(actual).toEqual(expected);
  });

  it('should get the rate for any datetime', () => {
    const input = new Date();
    const actual = sut.getRate(input);
    expect(actual).toEqual(mockRate);
  });

  it('should get the rate description for any datetime', () => {
    const input = new Date();
    const expected = 'Flat Rate';
    const actual = sut.getRateDescription(input);
    expect(actual).toEqual(expected);
  });
});
