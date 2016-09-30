import utilities from '../../utilities';
import { Maybe } from '../../../generic';

import accumulateZero from './accumulatezero';

const { fakeServices, nonZeroDigitToString } = utilities;

const accFactory = (p, n): AccumulatorState => {
  return {
    kind: 'accumulatorState',
    digits: n,
    pendingOperation: Maybe.of(p)
  };
};

describe('#accumulateZero state handler helper', () => {
  describe('appending to an empty accumulator', () => {
    it('appends zero to given accumulator via service', () => {
      const testState: AccumulatorState = {
        kind: 'accumulatorState',
        digits: '',
        pendingOperation: Maybe.of(null)
      };


      const expectedResult = `${testState.digits}${0}`;
      const result = accumulateZero(accFactory, fakeServices, testState);

      expect(result.digits).toEqual(expectedResult);
    });
  });

  describe('appending to a non empty accumulator', () => {
    it('appends zero to given accumulator via service', () => {
      const testState: AccumulatorState = {
        kind: 'accumulatorState',
        digits: '478309',
        pendingOperation: Maybe.of(null)
      };

      const expectedResult = `${testState.digits}${0}`;
      const result = accumulateZero(accFactory, fakeServices, testState);

      expect(result.digits).toEqual(expectedResult);
    });
  });
});
