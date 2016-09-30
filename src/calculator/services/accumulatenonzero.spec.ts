import accumulateNonZero from './accumulatenonzero';

const fakeAppender = (acc , d): DigitAccumulator => acc.slice() + d;

describe('AccumulateNonZero CalculatorService', () => {
  it('returns the expected accumulator', () => {
    const accumulator: DigitAccumulator = '5';

    const digit: NonZeroDigit = '5';

    const result = accumulateNonZero(fakeAppender)(digit, accumulator);
    const expectedResult = '55';

    expect(result).toEqual(expectedResult);
  });
});
