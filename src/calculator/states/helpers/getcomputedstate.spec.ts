import utilities from '../../utilities';
import { Maybe } from '../../../generic';

import getComputedState from './getcomputedstate';

const { fakeServices, nonZeroDigitToString } = utilities;

const noop = () => {};

const csFactory: ComputedStateFactory = (p, d) => {
  return {
    kind: 'computedState',
    pendingOperation: p,
    display: d
  };
};

describe('#getComputedState state handler helper', () => {
  describe('passing AccumulatorState with Just pendingOperation', () => {
    describe('addition', () => {
      it('returns expected ComputedState via service', () => {
        const testState: AccumulatorState = {
          kind: 'accumulatorState',
          pendingOperation: Maybe.of<PendingOperation>(['add', 5]),
          digits: '5'
        };

        const result = getComputedState(
          noop, csFactory, fakeServices, testState, 'subtract');

        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['subtract', 10]),
          display: 10
        };

        expect(result).toEqual(expectedResult);
      });
    });

    describe('subtraction', () => {
      it('returns expected ComputedState via service', () => {
        const testState: AccumulatorState = {
          kind: 'accumulatorState',
          pendingOperation: Maybe.of<PendingOperation>(['subtract', 10]),
          digits: '5'
        };

        const result = getComputedState(
          noop, csFactory, fakeServices, testState, 'add');

        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['add', 5]),
          display: 5
        };

        expect(result).toEqual(expectedResult);
      });
    });

    describe('multiplication', () => {
      it('returns expected ComputedState via service', () => {
        const testState: AccumulatorState = {
          kind: 'accumulatorState',
          pendingOperation: Maybe.of<PendingOperation>(['multiply', 10]),
          digits: '5'
        };

        const result = getComputedState(
          noop, csFactory, fakeServices, testState, 'add');

        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['add', 50]),
          display: 50
        };

        expect(result).toEqual(expectedResult);
      });
    });

    describe('division', () => {
      it('returns expected ComputedState via service', () => {
        const testState: AccumulatorState = {
          kind: 'accumulatorState',
          pendingOperation: Maybe.of<PendingOperation>(['divide', 10]),
          digits: '5'
        };

        const result = getComputedState(
          noop, csFactory, fakeServices, testState, 'add');

        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['add', 2]),
          display: 2
        };

        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('passing AccumulatorState with Nothing pendingOperation', () => {
    describe('addition', () => {
      it('returns expected ComputedState via service', () => {
        const testState: AccumulatorState = {
          kind: 'accumulatorState',
          pendingOperation: Maybe.of(null),
          digits: '5'
        };

        const result = getComputedState(
          noop, csFactory, fakeServices, testState, 'add');

        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['add', 5]),
          display: 5
        };

        expect(result).toEqual(expectedResult);
      });
    });

    describe('subtraction', () => {
      it('returns expected ComputedState via service', () => {
        const testState: AccumulatorState = {
          kind: 'accumulatorState',
          pendingOperation: Maybe.of(null),
          digits: '5'
        };

        const result = getComputedState(
          noop, csFactory, fakeServices, testState, 'subtract');

        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['subtract', 5]),
          display: 5
        };

        expect(result).toEqual(expectedResult);
      });
    });

    describe('multiplication', () => {
      it('returns expected ComputedState via service', () => {
        const testState: AccumulatorState = {
          kind: 'accumulatorState',
          pendingOperation: Maybe.of(null),
          digits: '5'
        };

        const result = getComputedState(
          noop, csFactory, fakeServices, testState, 'multiply');

        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['multiply', 5]),
          display: 5
        };

        expect(result).toEqual(expectedResult);
      });
    });

    describe('division', () => {
      it('returns expected ComputedState via service', () => {
        const testState: AccumulatorState = {
          kind: 'accumulatorState',
          pendingOperation: Maybe.of(null),
          digits: '5'
        };

        const result = getComputedState(
          noop, csFactory, fakeServices, testState, 'divide');

        const expectedResult: ComputedState = {
          kind: 'computedState',
          pendingOperation: Maybe.of<PendingOperation>(['divide', 5]),
          display: 5
        };

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
