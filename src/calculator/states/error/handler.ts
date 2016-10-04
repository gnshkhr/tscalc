import { Maybe } from '../../../generic';
import zero from '../zero';
import { errorStateFactory } from './factory';

const handleErrorState =
  (
    state: ErrorState,
    input: Zero | NonZeroDigit | Operation | Equals | Clear
  ): CalculatorState => {
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
      case 'equals': {
        const nextState = errorStateFactory(state.error);
        return nextState;
      }

      case 'clear': {
        const nextState = zero.factory(Maybe.of(null));
        return nextState;
      }
    }
  };

export { handleErrorState };
