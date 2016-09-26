import { appendToAccumulator } from './helpers';

const accumulateNonZero = (): AccumulateNonZero => {
  return (digit: NonZeroDigit, accumulator: DigitAccumulator):
    DigitAccumulator => {
      const next: DigitAccumulator = appendToAccumulator(accumulator, digit);
      return next;
    };
};

export default accumulateNonZero;
