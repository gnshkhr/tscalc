import { curry, compose } from 'ramda';

import { Maybe } from '../../../generic';

const replacePendingHelper =
  (
    compFactory: ComputedStateFactory,
    state: ComputedState,
    nextOperation: Operation
  ): ComputedState => {
    const swap = (val) => {
      const [existing, displayNumber] = val;
      const next = nextOperation;
      return Maybe.of([next, displayNumber]);
    };

    const nextPending = state.pendingOperation.bind(swap);

    const nextState = Object.assign({}, state, {
      pendingOperation: nextPending
    });

    return nextState;
};

const helper = curry(replacePendingHelper);

export default helper;
