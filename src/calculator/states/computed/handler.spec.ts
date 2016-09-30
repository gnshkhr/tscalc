import { Maybe } from '../../../generic';
import utilities from '../../utilities';

import handler from './handler';

const { fakeServices } = utilities;

const getComputedState = (p, n): ComputedState => {
  return {
    kind: 'computedState',
    pendingOperation: Maybe.of(p),
    display: n
  };
};

describe('ComputedState #handler', () => {
  describe('handling input of Zero', () => {
    it('returns proper ZeroState', () => {
      const testState = getComputedState(['add', 10], 5);

      const result = handler(fakeServices, testState, '0');
      const expectedResult: ZeroState = {
        kind: 'zeroState',
        pendingOperation: Maybe.of<PendingOperation>(['add', 10])
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of NonZeroDigit', () => {
    it('returns proper AccumulatorState', () => {
      const testState = getComputedState(['add', 10], 5);

      const result = handler(fakeServices, testState, '5');
      const expectedResult: AccumulatorState = {
        kind: 'accumulatorState',
        pendingOperation: Maybe.of<PendingOperation>(['add', 10]),
        digits: '5'
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of Operation', () => {
    it('returns Proper ComputedState', () => {
      pending();
      const testState = getComputedState(['add', 10], 5);

      const result = handler(fakeServices, testState, 'multiply');
      const expectedResult: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of<PendingOperation>(['multiply', 10]),
        display: 5
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of Equals', () => {
    it('returns proper ComputedState', () => {
      pending();
      const testState = getComputedState(['add', 10], 5);

      const result = handler(fakeServices, testState, 'equals');
      const expectedResult: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of(null),
        display: 5
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling input of Clear', () => {
    it('returns proper ZeroState', () => {
      const testState = getComputedState(['add', 10], 5);

      const result = handler(fakeServices, testState, 'clear');
      const expectedResult: ZeroState = {
        kind: 'zeroState',
        pendingOperation: Maybe.of(null)
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
