import { curry } from 'ramda';

const replacePendingHelper =
  (
    compFactory,
    state: ComputedState,
    nextOperation: Operation
  ): ComputedState => {
  // const [currentOp, currentNum] = state.pendingOperation;

  // const nextPending: PendingOperation = [nextOperation, currentNum];

  // const nextState = compFactory(nextPending, state.display);

  // return nextState;
  return state;
};

const helper = curry(replacePendingHelper);

export default helper;
