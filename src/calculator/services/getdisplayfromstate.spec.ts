import { Maybe } from '../../generic';

import getDisplayFromState from './getdisplayfromstate';

const fakeService = accState => parseFloat(accState.digits.slice());

describe('GetDisplayFromState CalculatorService', () => {
  describe('getting display from ZeroState', () => {
    it('gets expected display', () => {
      const testState: ZeroState = {
        kind: 'zeroState',
        pendingOperation: Maybe.of(null)
      };

      const result = getDisplayFromState(fakeService)(testState);
      const expectedResult = '0';

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getting display from AccumulatorState', () => {
    it('gets expected display', () => {
      const testState: AccumulatorState = {
        kind: 'accumulatorState',
        pendingOperation: Maybe.of(null),
        digits: '12345'
      };

      const result = getDisplayFromState(fakeService)(testState);
      const expectedResult = '12345';

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getting display from ComputedState', () => {
    it('gets expected display', () => {
      const testState: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of(null),
        display: 12345
      };

      const result = getDisplayFromState(fakeService)(testState);
      const expectedResult = '12345';

      expect(result).toEqual(expectedResult);
    });
  });
});
