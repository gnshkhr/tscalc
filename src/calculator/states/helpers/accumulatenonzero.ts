import accumulatorState from '../accumulator';

const accumulateNonZeroHelper =
  (
    services: CalculatorServices,
    digit: NonZeroDigit,
    state: AccumulatorState
  ): AccumulatorState => {
    const currentPending: PendingOperation = state.pendingOperation;
    const currentDigits: DigitAccumulator = state.digits.slice();

    const nextDigits: DigitAccumulator =
      services.accumulateNonZero(digit, currentDigits);

    const nextState: AccumulatorState =
      accumulatorState.factory(currentPending, nextDigits);

    return nextState;
};

export default accumulateNonZeroHelper;
