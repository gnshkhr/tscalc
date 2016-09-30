import { Maybe } from '../../../generic';
import factory from './factory';

describe('ZeroStateFactory #factory', () => {
  it('returns expected ZeroState', () => {
    const result = factory(Maybe.of(null));
    const expectedResult: ZeroState = {
      kind: 'zeroState',
      pendingOperation: Maybe.of(null)
    };

    expect(result).toEqual(expectedResult);
  });
});
