import ifNone from './ifnone';

describe('#ifNone state handler helper', () => {
  describe('passing undefined input arg to #ifNone', () => {
    it('returns the defaultVal arg', () => {
      const defaultVal = 'foo';
      const input = undefined;

      const result = ifNone(defaultVal, input);
      const expectedResult = defaultVal.slice();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('passing defined input arg to #ifNone', () => {
    it('returns the input arg', () => {
      const defaultVal = 'foo';
      const input = 'bar';

      const result = ifNone(defaultVal, input);
      const expectedResult = input.slice();

      expect(result).toEqual(expectedResult);
    });
  });
});
