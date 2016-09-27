import ifNone from './ifnone';
import accumulatorState from '../accumulator';
import computedState from '../computed';

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

export default getComputedStateHelper;
