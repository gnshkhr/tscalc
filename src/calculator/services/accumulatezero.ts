const accumulateZero = (appendFunc): AccumulateZero => {
  return (accumulator: DigitAccumulator): DigitAccumulator => {
    const charToAppend: Zero = "0";
    const next: DigitAccumulator = appendFunc(accumulator, charToAppend);
    return next;
  };
};

export default accumulateZero;
