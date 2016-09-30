import accumulateZero from './accumulatezero';

const fakeAppender = (acc , d): DigitAccumulator => acc.slice() + d;

describe('AccumulateZero CalculatorService', () => {
  it('returns the expected accumulator', () => {
    const accumulator = '5';

    const result = accumulateZero(fakeAppender)(accumulator);
    const expectedResult = '50';

    expect(result).toEqual(expectedResult);
  });
});
