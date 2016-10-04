import { Maybe } from '../../../generic';

import { handleErrorState } from './handler';

const getErrorState = (e: OperationError): ErrorState => {
  return {
    kind: 'errorState',
    error: e
  };
};

describe('ErrorState #handler', () => {
  describe('handling any input besides clear', () => {
    it('returns proper ErrorState', () => {
      const testState = getErrorState('Cannot divide by zero');

      const result = handleErrorState(testState, '5');
      const expectedResult: ErrorState = {
        kind: 'errorState',
        error: 'Cannot divide by zero'
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('handling any input besides clear', () => {
    it('returns proper ZeroState', () => {
      const testState = getErrorState('Cannot divide by zero');

      const result = handleErrorState(testState, 'clear');
      const expectedResult: ZeroState = {
        kind: 'zeroState',
        pendingOperation: Maybe.of(null)
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
