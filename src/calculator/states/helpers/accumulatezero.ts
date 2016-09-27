import accumulatorState from '../accumulator';

const accumulateZeroHelper =
  (
    services: CalculatorServices,
    state: AccumulatorState
  ): AccumulatorState => {
  const digits: DigitAccumulator = state.digits.slice();
  const pending: PendingOperation = state.pendingOperation;

  const nextDigits: DigitAccumulator = services.accumulateZero(digits);

  const nextState: AccumulatorState =
    accumulatorState.factory(pending, nextDigits);

  return nextState;
};

export default accumulateZeroHelper;
