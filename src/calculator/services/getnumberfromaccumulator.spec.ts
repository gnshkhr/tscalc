import { Maybe } from '../../generic';
import getNumberFromAccumulator from './getnumberfromaccumulator';

describe('GetNumberFromAccumulator CalculatorService', () => {
  it('returns the expected number', () => {
    const testState: AccumulatorState = {
      kind: 'accumulatorState',
      pendingOperation: Maybe.of(null),
      digits: '12345'
    };

    const result = getNumberFromAccumulator()(testState);
    const expectedResult = 12345;

    expect(result).toEqual(expectedResult);
  });
});
