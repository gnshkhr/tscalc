import utilities from '../../utilities';
import { Maybe } from '../../../generic';

import replacePending from './replacepending';

const { fakeServices, nonZeroDigitToString } = utilities;

const csFactory = (p, d): ComputedState => {
  return {
    kind: 'computedState',
    pendingOperation: p,
    display: d
  };
};

describe('#replacePending state handler helper', () => {
  describe('passing ComputedState with Just pendingOperation', () => {
    describe('with Just nextOperation', () => {
      it('replaces pendingOperation with one built from nextOperation', () => {
        const testState: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['subtract', 5]),
          display: 5
        };

        const testOperation = Maybe.of<Operation>('add');

        const result = replacePending(csFactory, testState, testOperation);
        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['add', 5]),
          display: 5
        };

        expect(result).toEqual(expectedResult);
      });
    });

    describe('with Nothing nextOperation', () => {
      it('replaces pendingOperation with one built from nextOperation', () => {
        const testState: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['subtract', 5]),
          display: 5
        };

        const testOperation = Maybe.of(null);

        const result = replacePending(csFactory, testState, testOperation);
        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of(null),
          display: 5
        };

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
