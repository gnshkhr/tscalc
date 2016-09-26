import getNumberFromAccumulator from './getnumberfromaccumulator';

// TODO explicit dependency via parameter
const getDisplayFromState = (): GetDisplayFromState => {
  const numberToString = num => '' + num;

  return (state: CalculatorState): string => {
    switch (state.kind) {
      case 'zeroState': {
        return '0';
      }

      case 'accumulatorState': {
        const num = getNumberFromAccumulator()(state);
        const text = numberToString(num);
        return text;
      }

      case 'computedState': {
        const text = numberToString(state.display);
        return text;
      }
    }
  };
};

export default getDisplayFromState;
