import { Maybe } from '../../../generic';
import { curry } from 'ramda';

import helpers from '../helpers';
import zero from '../zero';

const handleAccumulatorState =
  (
    services: CalculatorServices,
    state: AccumulatorState,
    input: Input
  ): CalculatorState => {
  switch (input) {
    case '0': {
      const nextState = helpers.accumulateZero(services, state);
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
      const nextState = helpers.accumulateNonZero(services, input, state);
      return nextState;
    }

    case 'add': {
      // const nextOperation: Add = 'add';
      const nextOperation = Maybe.of<Operation>('add');
      const nextState = helpers.getComputedState(services, state, nextOperation);

      return nextState;
    }

    case 'subtract': {
      const nextOperation = Maybe.of<Operation>('subtract');
      const nextState = helpers.getComputedState(services, state, nextOperation);

      return nextState;
    }

    case 'multiply': {
      const nextOperation = Maybe.of<Operation>('multiply');
      const nextState = helpers.getComputedState(services, state, nextOperation);

      return nextState;
    }

    case 'divide': {
      const nextOperation = Maybe.of<Operation>('divide');
      const nextState = helpers.getComputedState(services, state, nextOperation);

      return nextState;
    }

    case 'equals': {
      const nextOperation = Maybe.of(null);
      const nextState = helpers.getComputedState(services, state, nextOperation);
      return nextState;
    }

    case 'clear': {
      const nextState: ZeroState = zero.factory(Maybe.of(null));
      return nextState;
    }
  }
};

const handler = curry(handleAccumulatorState);

export default handler;
