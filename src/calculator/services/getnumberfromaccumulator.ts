const getNumberFromAccumulator = (): GetNumberFromAccumulator => {
  return (state: AccumulatorState): number => {
    const digits: DigitAccumulator = state.digits.slice();

    const num: number = parseFloat(digits);

    return num;
  };
};

export default getNumberFromAccumulator;
