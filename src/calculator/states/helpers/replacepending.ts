import computedState from '../computed';

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

export default replacePendingHelper;
