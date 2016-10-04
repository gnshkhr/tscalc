import { Maybe } from '../../generic';
import getPendingFromState from './getpendingfromstate';

describe('GetPendingFromState CalculatorService', () => {
  describe('getting pendingOperation from ZeroState', () => {
    describe('when pendingOperation is Just', () => {
      describe('when op is "add"', () => {
        it('gets expected pendingOperation', () => {
          const testState: ZeroState = {
            kind: 'zeroState',
            pendingOperation: Maybe.of<PendingOperation>(['add', 5])
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 +';

          expect(result).toEqual(expectedResult);
        });
      });

      describe('when op is "subtract"', () => {
        it('gets expected pendingOperation', () => {
          const testState: ZeroState = {
            kind: 'zeroState',
            pendingOperation: Maybe.of<PendingOperation>(['subtract', 5])
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 -';

          expect(result).toEqual(expectedResult);
        });
      });

      describe('when op is "multiply"', () => {
        it('gets expected pendingOperation', () => {
          const testState: ZeroState = {
            kind: 'zeroState',
            pendingOperation: Maybe.of<PendingOperation>(['multiply', 5])
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 *';

          expect(result).toEqual(expectedResult);
        });
      });

      describe('when op is "divide"', () => {
        it('gets expected pendingOperation', () => {
          const testState: ZeroState = {
            kind: 'zeroState',
            pendingOperation: Maybe.of<PendingOperation>(['divide', 5])
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 /';

          expect(result).toEqual(expectedResult);
        });
      });
    });

    describe('when pendingOperation is Nothing', () => {
      it('gets expected pendingOperation', () => {
        const testState: ZeroState = {
            kind: 'zeroState',
            pendingOperation: Maybe.of(null)
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '';

          expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('getting pendingOperation from AccumulatorState', () => {
    describe('when pendingOperation is Just', () => {
      describe('when op is "add"', () => {
        it('gets expected pendingOperation', () => {
          const testState: AccumulatorState = {
            kind: 'accumulatorState',
            pendingOperation: Maybe.of<PendingOperation>(['add', 5]),
            digits: '1'
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 +';

          expect(result).toEqual(expectedResult);
        });
      });

      describe('when op is "subtract"', () => {
        it('gets expected pendingOperation', () => {
          const testState: AccumulatorState = {
            kind: 'accumulatorState',
            pendingOperation: Maybe.of<PendingOperation>(['subtract', 5]),
            digits: '1'
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 -';

          expect(result).toEqual(expectedResult);
        });
      });

      describe('when op is "multiply"', () => {
        it('gets expected pendingOperation', () => {
          const testState: AccumulatorState = {
            kind: 'accumulatorState',
            pendingOperation: Maybe.of<PendingOperation>(['multiply', 5]),
            digits: '1'
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 *';

          expect(result).toEqual(expectedResult);
        });
      });

      describe('when op is "divide"', () => {
        it('gets expected pendingOperation', () => {
          const testState: AccumulatorState = {
            kind: 'accumulatorState',
            pendingOperation: Maybe.of<PendingOperation>(['divide', 5]),
            digits: '1'
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 /';

          expect(result).toEqual(expectedResult);
        });
      });
    });

    describe('when pendingOperation is Nothing', () => {
      it('gets expected pendingOperation', () => {
        const testState: AccumulatorState = {
            kind: 'accumulatorState',
            pendingOperation: Maybe.of(null),
            digits: '1'
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '';

          expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('getting pendingOperation from ComputedState', () => {
    describe('when pendingOperation is Just', () => {
      describe('when op is "add"', () => {
        it('gets expected pendingOperation', () => {
          const testState: ComputedState = {
            kind: 'computedState',
            pendingOperation: Maybe.of<PendingOperation>(['add', 5]),
            display: 1
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 +';

          expect(result).toEqual(expectedResult);
        });
      });

      describe('when op is "subtract"', () => {
        it('gets expected pendingOperation', () => {
          const testState: ComputedState = {
            kind: 'computedState',
            pendingOperation: Maybe.of<PendingOperation>(['subtract', 5]),
            display: 1
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 -';

          expect(result).toEqual(expectedResult);
        });
      });

      describe('when op is "multiply"', () => {
        it('gets expected pendingOperation', () => {
          const testState: ComputedState = {
            kind: 'computedState',
            pendingOperation: Maybe.of<PendingOperation>(['multiply', 5]),
            display: 1
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 *';

          expect(result).toEqual(expectedResult);
        });
      });

      describe('when op is "divide"', () => {
        it('gets expected pendingOperation', () => {
          const testState: ComputedState = {
            kind: 'computedState',
            pendingOperation: Maybe.of<PendingOperation>(['divide', 5]),
            display: 1
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '5 /';

          expect(result).toEqual(expectedResult);
        });
      });
    });

    describe('when pendingOperation is Nothing', () => {
      it('gets expected pendingOperation', () => {
        const testState: ComputedState = {
            kind: 'computedState',
            pendingOperation: Maybe.of(null),
            display: 1
          };

          const result = getPendingFromState()(testState);
          const expectedResult = '';

          expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('getting pendingOperation from ErrorState', () => {
    it('gets expected pendingOperation', () => {
      const testState: ErrorState = {
        kind: 'errorState',
        error: 'Cannot divide by zero'
      };

      const result = getPendingFromState()(testState);
      const expectedResult = '';

      expect(result).toEqual(expectedResult);
    });
  });
});
