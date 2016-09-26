import { curry } from 'ramda';

import {
  accumulateZeroHelper,
  accumulateNonZeroHelper,
  getComputedStateHelper
} from '../helpers';

const handleAccumulatorState =
  (
    services,
    state,
    input: Input
  ): CalculatorState => {
  switch (input) {
    case '0': {
      const nextState = accumulateZeroHelper(services, state);
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
      const nextState = accumulateNonZeroHelper(services, input, state);
      return nextState;
    }

    case 'add': {
      const nextOperation: Add = 'add';
      const nextState = getComputedStateHelper(services, state, nextOperation);

      return nextState;
    }

    case 'subtract': {}
    case 'multiply': {}
    case 'divide': {}

    case 'equals': {
      const nextOperation = undefined;
      const nextState = getComputedStateHelper(services, state, nextOperation);
      return nextState;
    }

    case 'clear': {}
  }
};

const handler = curry(handleAccumulatorState);

export default handler;
