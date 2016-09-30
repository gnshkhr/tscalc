const accumulateNonZero = (appendFunc): AccumulateNonZero => {
  return (
    digit: NonZeroDigit,
    accumulator: DigitAccumulator
    ): DigitAccumulator => {
      const next: DigitAccumulator = appendFunc(accumulator, digit);
      return next;
    };
};

export default accumulateNonZero;
