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

  performOperation: (): OperationResult => {
    return 5;
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
