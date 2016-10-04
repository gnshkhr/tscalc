import { Either } from '../../generic';

const fakeServices = {
  accumulateNonZero:
  (
    digit,
    accumulator
  ): DigitAccumulator => {
    const next = `${accumulator}${digit}`;
    return next;
  },

  accumulateZero: (accumulator): DigitAccumulator => {
    const next = `${accumulator}${0}`;
    return next;
  },

  performOperation: (op, x, y): OperationResult => {
    const handleAdd = (x: number, y: number): number => x + y;
    const handleSubtract = (x: number, y: number): number => x - y;
    const handleMultiply = (x: number, y: number): number => x * y;
    const handleDivide = (x: number, y: number): number => x / y;

    switch (op) {
      case 'add': { return Either.of(handleAdd(x, y)); }
      case 'subtract': { return Either.of(handleSubtract(x, y)); }
      case 'multiply': { return Either.of(handleMultiply(x, y)); }
      case 'divide': {
        return y === 0 ?
          Either.left<DivideByZeroError>('Cannot divide by zero') :
          Either.of(handleDivide(x, y));
      }
    }
  },

  getNumberFromAccumulator: (state) => {
    return state.digits.length < 1 ?
      0 :
      parseFloat(state.digits.slice());
  },

  getDisplayFromState: () => {
    return '';
  },

  getPendingFromState: () => {
    return '';
  }
};

export default fakeServices;
