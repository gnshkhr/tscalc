import { errorStateFactory } from './factory';

describe('ErrorStateFactory #factory', () => {
  it('returns expected ErrorState', () => {
    const result = errorStateFactory('Cannot divide by zero');
    const expectedResult: ErrorState = {
      kind: 'errorState',
      error: 'Cannot divide by zero'
    };

    expect(result).toEqual(expectedResult);
  });
});
