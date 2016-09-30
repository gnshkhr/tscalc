import { Maybe } from '../../../generic';
import factory from './factory';

describe('ComputedStateFactory #factory', () => {
  it('returns expected ComputedState', () => {
    const result = factory(Maybe.of(null), 5);
    const expectedResult: ComputedState = {
      kind: 'computedState',
      pendingOperation: Maybe.of(null),
      display: 5
    };

    expect(result).toEqual(expectedResult);
  });
});
