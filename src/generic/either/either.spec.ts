import Either from './';

describe('Either', () => {
  describe ('Left', () => {
    it('doesnt change', () => {
      const testFunc = x => x + 1;
      const testMonadicFunc = x => Either.right(x);
      const testLiftedFunc = Either.right(x => x);

      const result = Either.left(1)
        .map(testFunc)
        .bind(testMonadicFunc)
        .ap(testLiftedFunc);

      const expectedResult = Either.left(1);

      expect(result).toEqual(expectedResult);
    });
  });
});
