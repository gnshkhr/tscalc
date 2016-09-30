import { curry } from 'ramda';

const accumulateZeroHelper =
  (
    accumulatorFactory,
    services: CalculatorServices,
    state: AccumulatorState
  ): AccumulatorState => {
  const digits: DigitAccumulator = state.digits.slice();
  const pending: IMaybe<PendingOperation> = state.pendingOperation;

  const nextDigits: DigitAccumulator = services.accumulateZero(digits);

  const nextState: AccumulatorState =
    accumulatorFactory(pending, nextDigits);

  return nextState;
};

const helper = curry(accumulateZeroHelper);

export default helper;
