/* State Helpers */
import { curry } from 'ramda';

import accumulatorState from './accumulator';
import computedState from './computed';

const ifNone = (defaultVal, input) => {
  return !input ? defaultVal : input;
};

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

const getComputedStateHelper =
  (
    services,
    state: AccumulatorState,
    nextOperation: Operation
  ): ComputedState => {
  const currentNum: number = services.getNumberFromAccumulator(state);

  const computeNoPending =
    computedState.factory([nextOperation, currentNum], currentNum);

  if (!state.pendingOperation) return ifNone(computeNoPending, undefined);

  const [operation, previousNumber] = state.pendingOperation;

  const result = services.performOperation(operation, previousNumber, currentNum);

  const nextState = computedState.factory([nextOperation, result], result);
  return nextState;
};

const replacePendingHelper =
  (
    state: ComputedState,
    nextOperation: Operation
  ): ComputedState => {
  const [currentOp, currentNum] = state.pendingOperation;

  const nextPending: PendingOperation = [nextOperation, currentNum];

  const nextState = computedState.factory(nextPending, state.display);

  return nextState;
};

export {
  ifNone,
  accumulateNonZeroHelper,
  accumulateZeroHelper,
  getComputedStateHelper,
  replacePendingHelper
};
