import { Maybe } from '../../../generic';
import factory from './factory';

describe('AccumulatorStateFactory #factory', () => {
  it('returns expected AccumulatorState', () => {
    const result = factory(Maybe.of(null), '5');
    const expectedResult: AccumulatorState = {
      kind: 'accumulatorState',
      pendingOperation: Maybe.of(null),
      digits: '5'
    };

    expect(result).toEqual(expectedResult);
  });
});
