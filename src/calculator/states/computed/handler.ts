import { curry } from 'ramda';

import { Maybe } from '../../../generic';
import helpers from '../helpers';
import accumulator from '../accumulator';
import zero from '../zero';

const handleComputedState =
  (
    services: CalculatorServices,
    state: ComputedState,
    input: Zero | NonZeroDigit | Operation | Equals | Clear
  ): CalculatorState => {
  const currentPending = state.pendingOperation;
  const emptyAcc: AccumulatorState = accumulator.factory(currentPending, '');

  switch (input) {
    case '0': {
      const nextState: ZeroState = zero.factory(currentPending);
      return nextState;
    }

    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9': {
      const nextState = helpers.accumulateNonZero(services, input, emptyAcc);
      return nextState;
    }

    case 'add': {
      const nextOperation = Maybe.of<Operation>('add');
      // const nextOperation: Operation = 'add';
      const nextState = helpers.replacePending(state, nextOperation);
      return nextState;
    }

    case 'subtract': {
      const nextOperation = Maybe.of<Operation>('subtract');
      // const nextOperation: Operation = 'subtract';
      const nextState = helpers.replacePending(state, nextOperation);
      return nextState;
    }

    case 'multiply': {
      const nextOperation = Maybe.of<Operation>('multiply');
      // const nextOperation: Operation = 'multiply';
      const nextState = helpers.replacePending(state, nextOperation);
      return nextState;
    }

    case 'divide': {
      const nextOperation = Maybe.of<Operation>('divide');
      // const nextOperation: Operation = 'divide';
      const nextState = helpers.replacePending(state, nextOperation);
      return nextState;
    }

    case 'equals': {
      const nextOperation = Maybe.of(null);
      // const nextOperation = null;
      const nextState = helpers.replacePending(state, nextOperation);
      return nextState;
    }

    case 'clear': {
      const nextState: ZeroState = zero.factory(Maybe.of(null));
      return nextState;
    }
  }
};

const handler = curry(handleComputedState);

export default handler;
