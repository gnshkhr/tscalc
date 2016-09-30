import { curry } from 'ramda';

import { Maybe } from '../../../generic';

const getComputedStateHelper =
  (
    ifNoneFunc,
    compFactory: ComputedStateFactory,
    services: CalculatorServices,
    state: AccumulatorState,
    nextOperation: Operation
  ): ComputedState => {
    const getNextState = (dN: number) => {
      const nextPending = Maybe.of<PendingOperation>([nextOperation, dN]);
      const nextState = compFactory(nextPending, dN);
      return nextState;
    };

    const currentNum: number = services.getNumberFromAccumulator(state);

    const computeNoPending = () => getNextState(currentNum);

    if (state.pendingOperation.isNothing()) return computeNoPending();

    const [op, prevNum] = state.pendingOperation.some();
    const result = services.performOperation(op, prevNum, currentNum);

    return getNextState(result);
};

const helper = curry(getComputedStateHelper);

export default helper;
