import { Either } from './';

describe('Either', () => {
  it('', () => {
    const createId = id => id > 0 ?
      Either.of(id) :
      Either.left('Must be positive');

    const createName = name => (name !== null && name.trim().length > 0) ?
      Either.of(name) :
      Either.left('Name cannot be empty or whitespace');

    const createPerson = id => name => ({ id, name });

    const foo = (id, name) => {
      const idResult = createId(id);
      const nameResult = createName(name);

      const liftedCreatePerson = Either.map(createPerson, idResult);

      return Either.ap(liftedCreatePerson, nameResult);
    };

    const successful = foo(5, 'foo');

    // console.log('successful', successful);

    const failure = foo(0, 'foo');

    // console.log('failure', failure);

    pending();
  });
});
