import Maybe from './';

describe('Maybe', () => {
  describe('#bind', () => {
    describe('when isNothing === false (Just)', () => {
      it('obeys left identity', () => {
        const testFunc = x => Maybe.of(x); // f

        const a = '';

        const result = Maybe.of(a).bind(testFunc);
        const expectedResult = testFunc(a);

        expect(result.value).toEqual('');
        expect(result).toEqual(expectedResult);
      });

      it('obeys right identity', () => {
        const result = Maybe.of('').bind(Maybe.of);
        const expectedResult = Maybe.of('');

        expect(result.value).toEqual('');
        expect(result).toEqual(expectedResult);
      });

      it('obeys associativity', () => {
        const appendO = x => Maybe.of(x + 'o'); // f
        const appendK = x => Maybe.of(x + 'k'); // g

        const m = Maybe.of('');

        const result = m.bind(appendO).bind(appendK);
        const expectedResult = m.bind(x => appendO(x).bind(appendK));

        expect(result.value).toEqual('ok');
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when isNothing === true (Nothing)', () => {
      it('obeys left identity', () => {
        const testFunc = x => Maybe.of(x);

        const a = null;

        const result = Maybe.of(a).bind(testFunc);
        const expectedResult = testFunc(a);

        expect(result.value).toEqual(null);
        expect(result).toEqual(expectedResult);
      });

      it('obeys right identity', () => {
        const result = Maybe.of(null).bind(Maybe.of);
        const expectedResult = Maybe.of(null);

        expect(result.value).toEqual(null);
        expect(result).toEqual(expectedResult);
      });

      it('obeys associativity', () => {
        const appendO = x => Maybe.of(x + 'o'); // f
        const appendK = x => Maybe.of(x + 'k'); // g

        const m = Maybe.of(null);

        const result = m.bind(appendO).bind(appendK);
        const expectedResult = m.bind(x => appendO(x).bind(appendK));

        expect(result.value).toEqual(null);
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('#map', () => {
    describe('when isNothing === false (Just)', () => {
      it('obeys identity', () => {
        const u = Maybe.of('');

        const result = u.map(a => a);
        const expectedResult = Maybe.of('');

        expect(result.value).toEqual('');
        expect(result).toEqual(expectedResult);
      });

      it('obeys composition', () => {
        const appendO = x => x + 'o'; // f
        const appendK = x => x + 'k'; // g

        const u = Maybe.of('');

        const result = u.map(x => ((appendK)((appendO)(x))));
        const expectedResult = u.map(appendO).map(appendK);

        expect(result.value).toEqual('ok');
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when isNothing === true (Nothing)', () => {
      it('obeys identity', () => {
        const u = Maybe.of(null);

        const result = u.map(a => a);
        const expectedResult = Maybe.of(null);

        expect(result.value).toEqual(null);
        expect(result).toEqual(expectedResult);
      });

      it('obeys composition', () => {
        const appendO = x => x + 'o'; // f
        const appendK = x => x + 'k'; // g

        const u = Maybe.of(null);

        const result = u.map(x => ((appendK)((appendO)(x))));
        const expectedResult = u.map(appendO).map(appendK);

        expect(result.value).toEqual(null);
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('#ap', () => {
    describe('when isNothing === false (Just)', () => {
      it('obeys identity', () => {
        const v = Maybe.of('');

        const result = v.ap(Maybe.of(x => x));
        const expectedResult = Maybe.of('');

        expect(result.value).toEqual('');
        expect(result).toEqual(expectedResult);
      });

      it('obeys homomorphism', () => {
        const testFunc = x => x ? x + 'k' : x;

        const result = Maybe.of('o').ap(Maybe.of(testFunc));
        const expectedResult = Maybe.of(testFunc('o'));

        expect(result.value).toEqual('ok');
        expect(result).toEqual(expectedResult);
      });

      it('obeys interchange', () => {
        const testFunc = x => x ? x + 'k' : x;

        const y = 'o';
        const u = Maybe.of(testFunc);

        const result = Maybe.of(y).ap(u);
        const expectedResult = u.ap(Maybe.of(f => f(y)));

        expect(result.value).toEqual('ok');
        expect(result).toEqual(expectedResult);
      });

      it('obeys composition', () => {
        const appendO = x => x + 'o';
        const appendK = x => x + 'k';

        const v = Maybe.of('');
        const u = Maybe.of(appendO);
        const a = Maybe.of(appendK);

        const result = v.ap(u.ap(a.map(f => g => x => f(g(x)))));
        const expectedResult = v.ap(u).ap(a);

        expect(result.value).toEqual('ok');
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when isNothing === true (Nothing)', () => {
      it('obeys identity', () => {
        const v = Maybe.of(null);

        const result = v.ap(Maybe.of(x => x));
        const expectedResult = Maybe.of(null);

        expect(result.value).toEqual(null);
        expect(result).toEqual(expectedResult);
      });

      it('obeys homomorphism', () => {
        const testFunc = x => x ? x + 'k' : x;

        const result = Maybe.of(null).ap(Maybe.of(testFunc));
        const expectedResult = Maybe.of((testFunc(null)));

        expect(result.value).toEqual(null);
        expect(result).toEqual(expectedResult);
      });

      it('obeys interchange', () => {
        const testFunc = x => x ? x + 'k' : x;

        const y = null;
        const u = Maybe.of(testFunc);

        const result = Maybe.of(y).ap(u);
        const expectedResult = u.ap(Maybe.of(f => f(y)));

        expect(result.value).toEqual(null);
        expect(result).toEqual(expectedResult);
      });

      it('obeys composition', () => {
        const appendO = x => x + 'o';
        const appendK = x => x + 'k';

        const v = Maybe.of(null);
        const u = Maybe.of(appendO);
        const a = Maybe.of(appendK);

        const result = v.ap(u.ap(a.map(f => g => x => f(g(x)))));
        const expectedResult = v.ap(u).ap(a);

        expect(result.value).toEqual(null);
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
