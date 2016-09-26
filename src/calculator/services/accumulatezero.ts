import { appendToAccumulator } from './helpers';

const accumulateZero = (): AccumulateZero => {
  return (accumulator: DigitAccumulator): DigitAccumulator => {
    const charToAppend: Zero = "0";
    const next: DigitAccumulator = appendToAccumulator(accumulator, charToAppend);
    return next;
  };
};

export default accumulateZero;
