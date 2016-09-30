import appendToAccumulator from './appendtoaccumulator';

describe('#appendToAccumulator service helper', () => {
  describe('appending to empty accumulator', () => {
    it('appends a nonZeroDigit', () => {
      const emptyAccumulator: DigitAccumulator = '';

      const digit: NonZeroDigit = '5';

      const result = appendToAccumulator(emptyAccumulator, digit);
      const expectedResult = '5';

      expect(result).toEqual(expectedResult);
    });

    it('appends a zero', () => {
      const emptyAccumulator: DigitAccumulator = '';

      const digit: Zero = '0';

      const result = appendToAccumulator(emptyAccumulator, digit);
      const expectedResult = '0';

      expect(result).toEqual(expectedResult);
    });
  });

  describe('appending to non empty accumulator', () => {
    it('appends a nonZeroDigit', () => {
      const accumulator: DigitAccumulator = '5';

      const digit: NonZeroDigit = '5';

      const result = appendToAccumulator(accumulator, digit);
      const expectedResult = '55';

      expect(result).toEqual(expectedResult);
    });

    it('appends a zero', () => {
      const accumulator: DigitAccumulator = '5';

      const digit: Zero = '0';

      const result = appendToAccumulator(accumulator, digit);
      const expectedResult = '50';

      expect(result).toEqual(expectedResult);
    });
  });
});
