import states from './states';

const createCalculator = (services: CalculatorServices): Calculator => {
  const zero = states.zero.handler(services);
  const accumulator = states.accumulator.handler(services);
  const computed = states.computed.handler(services);
  const error = states.error.handler;

  return (input, state): CalculatorState => {

    switch (state.kind) {
      case 'zeroState': {
        return zero(state, input);
      }

      case 'accumulatorState': {
        return accumulator(state, input);
      }

      case 'computedState': {
        return computed(state, input);
      }

      case 'errorState': {
        return error(state, input);
      }
    }
  };
};

export default createCalculator;
