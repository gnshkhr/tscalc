import { Maybe } from '../../../generic';
import utilities from '../../utilities';

import handler from './handler';

const { fakeServices } = utilities;

const getAccumulatorState = (p, d): AccumulatorState => {
  return {
    kind: 'accumulatorState',
    pendingOperation: Maybe.of(p),
    digits: d
  };
};

describe('AccumulatorState #handler', () => {
  describe('handling input of Zero', () => {
    it('returns proper AccumulatorState', () => {
      const testState = getAccumulatorState(null, '5');

      const result = handler(fakeServices, testState, '0');
      const expectedResult: AccumulatorState = {
        kind: 'accumulatorState',
        pendingOperation: Maybe.of(null),
        digits: '50'
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of NonZeroDigit', () => {
    it('returns proper AccumulatorState', () => {
      const testState = getAccumulatorState(null, '5');

      const result = handler(fakeServices, testState, '1');
      const expectedResult: AccumulatorState = {
        kind: 'accumulatorState',
        pendingOperation: Maybe.of(null),
        digits: '51'
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of Operation', () => {
    it('returns proper ComputedState', () => {
      const testState = getAccumulatorState(null, '5');

      const result = handler(fakeServices, testState, 'add');
      const expectedResult: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of<PendingOperation>(['add', 5]),
        display: 5
      };

      expect(result).toEqual(expectedResult);
    });

    it('returns proper ErrorState', () => {
      const testState = getAccumulatorState(['divide', 10], '0');

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
      const testState = getAccumulatorState(['add', 5], '5');

      const result = handler(fakeServices, testState, 'equals');
      const expectedResult: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of(null),
        display: 10
      };

      expect(result).toEqual(expectedResult);
    });

    it('returns proper ErrorState', () => {
      const testState = getAccumulatorState(['divide', 10], '0');

      const result = handler(fakeServices, testState, 'equals');
      const expectedResult: ErrorState = {
        kind: 'errorState',
        error: 'Cannot divide by zero'
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of Clear', () => {
    it('returns proper ZeroState', () => {
      const testState = getAccumulatorState(null, '5');

      const result = handler(fakeServices, testState, 'clear');
      const expectedResult: ZeroState = {
        kind: 'zeroState',
        pendingOperation: Maybe.of(null)
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
