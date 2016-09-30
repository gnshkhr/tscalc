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
      case 'add': { return handleAdd(x, y); }
      case 'subtract': { return handleSubtract(x, y); }
      case 'multiply': { return handleMultiply(x, y); }
      case 'divide': { return handleDivide(x, y); }
    }
  },

  getNumberFromAccumulator: () => {
    return 5;
  },

  getDisplayFromState: () => {
    return '';
  },

  getPendingFromState: () => {
    return '';
  }
};

export default fakeServices;
