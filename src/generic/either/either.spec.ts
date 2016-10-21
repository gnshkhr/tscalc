import { Either } from './';

describe('Either', () => {
  describe('static methods', () => {
    describe('#map', () => {
      describe('mapping over Left', () => {
        it('obeys identity', () => {
          const left = Either.left(1);

          const result = Either.map(x => x, left);
          const expectedResult = Either.left(1);

          expect(result).toEqual(Either.left(1));
          expect(result).toEqual(expectedResult);
        });

        it('obeys composition', () => {
          const addOne = x => x + 1;
          const subtractFour = x => x - 4;
          const composeTwo = (f, g) => x => f(g(x));

          const testFunc = composeTwo(subtractFour, addOne);

          const left = Either.left(5);

          const result = Either.map(testFunc, left);

          const first = Either.map(addOne, Either.left(5));
          const expectedResult = Either.map(subtractFour, first);

          expect(result).toEqual(Either.left(5));
          expect(result).toEqual(expectedResult);
        });
      });

      describe('mapping over Right', () => {
        it('obeys identity', () => {
          const right = Either.of(1);

          const result = Either.map(x => x, right);
          const expectedResult = Either.of(1);

          expect(result).toEqual(Either.of(1));
          expect(result).toEqual(expectedResult);
        });

        it('obeys composition', () => {
          const addOne = x => x + 1;
          const subtractFour = x => x - 4;
          const composeTwo = (f, g) => x => f(g(x));

          const testFunc = composeTwo(subtractFour, addOne);

          const right = Either.of(5);

          const result = Either.map(testFunc, right);

          const first = Either.map(addOne, Either.of(5));
          const expectedResult = Either.map(subtractFour, first);

          expect(result).toEqual(Either.of(2));
          expect(result).toEqual(expectedResult);
        });
      });
    });

    describe('#ap', () => {
      describe('applying over Left', () => {
        it('obeys identity', () => {
          const left = Either.left(1);

          const result = Either.ap(Either.left(x => x), left);
          const expectedResult = Either.left(1);

          expect(result).toEqual(Either.left(1));
          expect(result).toEqual(expectedResult);
        });
      });

      describe('applying over Right', () => {
        it('obeys identity', () => {
          const right = Either.right(1);

          const result = Either.ap(Either.right(x => x), right);
          const expectedResult = Either.right(1);

          expect(result).toEqual(Either.right(1));
          expect(result).toEqual(expectedResult);
        });

        it('obeys homomorphism', () => {
          const testFunc = x => x + 1;
          const right = Either.right(1);

          const result = Either.ap(Either.right(x => x + 1), right);
          const expectedResult = Either.right(testFunc(1));

          expect(result).toEqual(Either.right(2));
          expect(result).toEqual(expectedResult);
        });

        it('obeys interchange', () => {
          const testFunc = x => x + 1;
          const one = 1;

          const liftedTestFunc = Either.of(testFunc);
          const liftedOne = Either.of(one);

          const result = Either.ap(liftedTestFunc, liftedOne);
          const expectedResult = Either.ap(Either.of(f => f(one)), liftedTestFunc);

          console.log('result', result);
          console.log('expectedResult', expectedResult);

          expect(result).toEqual(Either.right(2));
          expect(result).toEqual(expectedResult);
        });

        it('obeys composition', () => {
          pending();
          // expect(result).toEqual('');
          // expect(result).toEqual(expectedResult);
        });
      });
    });
  });

  // it('', () => {
    // const createId = id => id > 0 ?
      // Either.of(id) :
      // Either.left('Must be positive');

    // const createName = name => (name !== null && name.trim().length > 0) ?
      // Either.of(name) :
      // Either.left('Name cannot be empty or whitespace');

    // const createPerson = id => name => ({ id, name });

    // const foo = (id, name) => {
      // const idResult = createId(id);
      // const nameResult = createName(name);

      // const liftedCreatePerson = Either.map(createPerson, idResult);

      // return Either.ap(liftedCreatePerson, nameResult);
    // };

    // const successful = foo(5, 'foo');

    // console.log('successful', successful);

    // const failure = foo(0, 'foo');

    // console.log('failure', failure);

    // pending();
  // });
});
