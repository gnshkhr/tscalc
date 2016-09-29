import Identity from './';

describe('Identity', () => {
  describe('#bind', () => {
    it('obeys left identity', () => {
      const testFunc = x => Identity.of(x); // f

      const a = '';

      const result = Identity.of(a).bind(testFunc);
      const expectedResult = testFunc(a);

      expect(result.value).toEqual('');
      expect(result).toEqual(expectedResult);
    });

    it('obeys right identity', () => {
      const result = Identity.of('').bind(Identity.of);
      const expectedResult = Identity.of('');

      expect(result.value).toEqual('');
      expect(result).toEqual(expectedResult);
    });

    it('obeys associativity', () => {
      const appendO = x => Identity.of(x + 'o'); // f
      const appendK = x => Identity.of(x + 'k'); // g

      const m = Identity.of('');

      const result = m.bind(appendO).bind(appendK);
      const expectedResult = m.bind(x => appendO(x).bind(appendK));

      expect(result.value).toEqual('ok');
      expect(result).toEqual(expectedResult);
    });
  });

  describe('#map', () => {
    it('obeys identity', () => {
      const u = Identity.of('');

      const result = u.map(a => a);
      const expectedResult = Identity.of('');

      expect(result.value).toEqual('');
      expect(result).toEqual(expectedResult);
    });

    it('obeys composition', () => {
      const appendO = x => x + 'o'; // f
      const appendK = x => x + 'k'; // g

      const u = Identity.of('');

      const result = u.map(x => ((appendK)((appendO)(x))));
      const expectedResult = u.map(appendO).map(appendK);

      expect(result.value).toEqual('ok');
      expect(result).toEqual(expectedResult);
    });
  });

  describe('#ap', () => {
    it('obeys identity', () => {
      const v = Identity.of('');

      const result = v.ap(Identity.of(x => x));
      const expectedResult = Identity.of('');

      expect(result.value).toEqual('');
      expect(result).toEqual(expectedResult);
    });

    it('obeys homomorphism', () => {
      const result = Identity.of('').ap(Identity.of(x => x + 'ok'));
      const expectedResult = Identity.of((x => x + 'ok')(''));

      expect(result.value).toEqual('ok');
      expect(result).toEqual(expectedResult);
    });

    it('obeys interchange', () => {
      const testFunc = x => x + 'k';

      const y = 'o';
      const u = Identity.of(testFunc);

      const result = Identity.of(y).ap(u);
      const expectedResult = u.ap(Identity.of(f => f(y)));

      expect(result.value).toEqual('ok');
      expect(result).toEqual(expectedResult);
    });

    it('obeys composition', () => {
      const appendO = x => x + 'o';
      const appendK = x => x + 'k';

      const v = Identity.of('');
      const u = Identity.of(appendO);
      const a = Identity.of(appendK);

      const result = v.ap(u.ap(a.map(f => g => x => f(g(x)))));
      const expectedResult = v.ap(u).ap(a);

      expect(result.value).toEqual('ok');
      expect(result).toEqual(expectedResult);
    });
  });
});
