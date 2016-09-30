import { curry } from 'ramda';

const accumulateNonZeroHelper =
  (
    accumulatorFactory,
    services: CalculatorServices,
    digit: NonZeroDigit,
    state: AccumulatorState
  ): AccumulatorState => {
    const currentPending: IMaybe<PendingOperation> = state.pendingOperation;
    const currentDigits: DigitAccumulator = state.digits.slice();

    const nextDigits: DigitAccumulator =
      services.accumulateNonZero(digit, currentDigits);

    const nextState: AccumulatorState =
      accumulatorFactory(currentPending, nextDigits);

    return nextState;
};

const helper = curry(accumulateNonZeroHelper);

export default helper;
