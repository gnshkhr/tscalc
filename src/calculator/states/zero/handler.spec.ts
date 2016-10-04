import { Maybe } from '../../../generic';
import utilities from '../../utilities';

import handler from './handler';

const { fakeServices } = utilities;

const getZeroState = (p): ZeroState => {
  return {
    kind: 'zeroState',
    pendingOperation: Maybe.of(p),
  };
};

describe('ZeroState #handler', () => {
  describe('handling input of Zero', () => {
    it('returns proper ZeroState', () => {
      const testState = getZeroState(null);

      const result = handler(fakeServices, testState, '0');
      const expectedResult: ZeroState = {
        kind: 'zeroState',
        pendingOperation: Maybe.of(null)
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of NonZeroDigit', () => {
    it('returns proper AccumulatorState', () => {
      const testState = getZeroState(null);

      const result = handler(fakeServices, testState, '1');
      const expectedResult: AccumulatorState = {
        kind: 'accumulatorState',
        pendingOperation: Maybe.of(null),
        digits: '1'
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of Operation', () => {
    it('returns proper ComputedState', () => {
      const testState = getZeroState(['add', 5]);

      const result = handler(fakeServices, testState, 'multiply');
      const expectedResult: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of<PendingOperation>(['multiply', 5]),
        display: 5
      };

      expect(result).toEqual(expectedResult);
    });

    it('returns proper ErrorState', () => {
      const testState = getZeroState(['divide', 0]);

      const result = handler(fakeServices, testState, 'add');
      const expectedResult: ErrorState = {
        kind: 'errorState',
        error: 'Cannot divide by zero'
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of Equals', () => {
    it('returns proper ComputedState', () => {
      const testState = getZeroState(['add', 5]);

      const result = handler(fakeServices, testState, 'equals');
      const expectedResult: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of(null),
        display: 5
      };

      expect(result).toEqual(expectedResult);
    });

    it('returns proper ErrorState', () => {
      const testState = getZeroState(['divide', 0]);

      const result = handler(fakeServices, testState, 'equals');
      const expectedResult: ErrorState = {
        kind: 'errorState',
        error: 'Cannot divide by zero'
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of Clear', () => {
    it('return proper ZeroState', () => {
      const testState = getZeroState(null);

      const result = handler(fakeServices, testState, 'clear');
      const expectedResult: ZeroState = {
        kind: 'zeroState',
        pendingOperation: Maybe.of(null)
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
