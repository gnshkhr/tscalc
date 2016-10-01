import { curry, compose } from 'ramda';

import { Maybe } from '../../../generic';

const replacePendingHelper =
  (
    compFactory: ComputedStateFactory,
    state: ComputedState,
    nextOperation: Maybe<Operation>
  ): ComputedState => {
    const swap = (val: PendingOperation): Maybe<PendingOperation> => {
      const [existing, displayNumber] = val;
      // const next = nextOperation.isNothing() ? null : nextOperation.some();
      // return Maybe.of<PendingOperation>([next, displayNumber]);
      return nextOperation.isNothing() ?
        Maybe.of(null) :
        Maybe.of<PendingOperation>([nextOperation.some(), displayNumber]);
    };

    const nextPending = state.pendingOperation.bind(swap);

    const nextState = Object.assign({}, state, {
      pendingOperation: nextPending
    });

    return nextState;
};

const helper = curry(replacePendingHelper);

export default helper;
