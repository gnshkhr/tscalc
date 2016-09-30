const appendToAccumulator =
  (currentAccumulator: DigitAccumulator, charToAppend: NonZeroDigit | Zero)
    : DigitAccumulator => {
      const next: DigitAccumulator = currentAccumulator.slice() + charToAppend;
      return next;
    };

export default appendToAccumulator;
