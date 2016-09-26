import { curry } from 'ramda';

import { accumulateNonZeroHelper } from '../helpers';
import accumulator from '../accumulator';

const handleComputedState =
  (
    services,
    state,
    input
  ): CalculatorState => {
  const currentPending = state.pendingOperation;
  const emptyAccumulatorState: AccumulatorState = accumulator.factory(currentPending, '');

  switch (input) {
    case '0': {}

    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9': {
      const nextState = accumulateNonZeroHelper(services, input, emptyAccumulatorState);
      return nextState;
    }

    case 'add': {}
    case 'subtract': {}
    case 'multiply': {}
    case 'divide': {}

    case 'equals': {}
    case 'clear': {}
  }
};

const handler = curry(handleComputedState);

export default handler;
