import utilities from '../../utilities';
import { Maybe } from '../../../generic';

import replacePending from './replacepending';

const { fakeServices, nonZeroDigitToString } = utilities;

const csFactory = (p, d): ComputedState => {
  return {
    kind: 'computedState',
    pendingOperation: Maybe.of(p),
    display: d
  };
};

describe('#replacePending state handler helper', () => {
  describe('passing ComputedState with Just pendingOperation', () => {
    it('returns expected ComputedState', () => {
      const testState: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of<PendingOperation>(['subtract', 5]),
        display: 5
      };

      const result = replacePending(csFactory, testState, 'add');

      const expectedResult: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of<PendingOperation>(['add', 5]),
        display: 5
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('passing ComputedState with Nothing pendingOperation', () => {
    it('returns expected ComputedState', () => {
      const testState: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of(null),
        display: 5
      };

      const result = replacePending(csFactory, testState, 'add');

      const expectedResult: ComputedState = {
        kind: 'computedState',
        pendingOperation: Maybe.of(null),
        display: 5
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
