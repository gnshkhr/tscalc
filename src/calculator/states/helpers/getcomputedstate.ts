import { curry } from 'ramda';

import { Maybe, Either } from '../../../generic';
import { errorStateFactory } from '../error';

const getComputedStateHelper =
  (
    ifNoneFunc,
    compFactory: ComputedStateFactory,
    services: CalculatorServices,
    state: AccumulatorState,
    nextOperation: Maybe<Operation>
  ): ComputedState | ErrorState => {
    const getNextState = (dN: number) => {
      return nextOperation.isNothing() ?
        compFactory(Maybe.of(null), dN) :
        compFactory(Maybe.of<PendingOperation>([nextOperation.some(), dN]), dN);
    };

    const currentNum: number = services.getNumberFromAccumulator(state);

    const computeNoPending = () => getNextState(currentNum);

    if (state.pendingOperation.isNothing()) return computeNoPending();

    const [op, prevNum] = state.pendingOperation.some();
    const result = services.performOperation(op, prevNum, currentNum);

    if (Either.isRight(result)) {
      return getNextState(<number>result.value);
    }

    if (Either.isLeft(result)) {
      return errorStateFactory(<OperationError>result.value);
    }
};

const helper = curry(getComputedStateHelper);

export default helper;
