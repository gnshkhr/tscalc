import utilities from '../../utilities';
import { Maybe } from '../../../monads';

import accumulateNonZero from './accumulatenonzero';

const { fakeServices, nonZeroDigitToString } = utilities;

const accFactory = (p, n): AccumulatorState => {
  return {
    kind: 'accumulatorState',
    digits: n,
    pendingOperation: Maybe.of(p)
  };
};

const forEachNonZeroDigit = (acc) => {
  for (let i = 1; i < 10; i++) {
    it('appends digit to given accumulator via service', () => {
      const testState: AccumulatorState = {
        kind: 'accumulatorState',
        digits: acc,
        pendingOperation: Maybe.of(null)
      };

      const testDigit: NonZeroDigit = nonZeroDigitToString(i);
      const expectedResult = `${testState.digits}${testDigit}`;
      const result = accumulateNonZero(accFactory, fakeServices, testDigit, testState);

      expect(result.digits).toEqual(expectedResult);
    });
  }
};

describe('#accumulateNonZero state handler helper', () => {
  describe('appending to an empty accumulator', () => {
    forEachNonZeroDigit('');
  });

  describe('appending to a non empty accumulator', () => {
    forEachNonZeroDigit('4872');
  });
});
