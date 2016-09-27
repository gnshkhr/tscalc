import { curry } from 'ramda';

import helpers from '../helpers';
import accumulator from '../accumulator';
import zeroFactory from './factory';

const handleZeroState =
  (
    services,
    state: ZeroState,
    input
  ): CalculatorState => {
  const currentPending = state.pendingOperation;
  const accumulatorState = accumulator.factory(currentPending, '');

  switch (input) {
    case '0': {
      return zeroFactory(state.pendingOperation);
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
      const next = helpers.accumulateNonZero(services, input, accumulatorState);
      return next;
    }

    case 'add': {
      const nextOperation = input;
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'subtract': {
      const nextOperation = input;
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'multiply': {
      const nextOperation = input;
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'divide': {
      const nextOperation = input;
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'equals': {
      const nextOperation = undefined;
      const nextState = helpers.getComputedState(services, accumulatorState, nextOperation);
      return nextState;
    }

    case 'clear': {
      const nextState: ZeroState = zeroFactory(undefined);
      return nextState;
    }
  }
};

const handler = curry(handleZeroState);

export default handler;
