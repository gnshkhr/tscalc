const id = x => x;

class Left<L> implements IMonad<L>, ILeft<L> {
  readonly value: L;

  private constructor(val: L) {
    this.value = val;
  }

  static of<L>(val: L): Left<L> {
    return new Left(val);
  }

  static isLeft<T>(l: T): boolean {
    return l.constructor === Left;
  }

  map<U>(f: (value: L) => U): Left<U> {
    return Left.of(id(this.value));
  }

  bind<U>(monadicF: (value: L) => Left<U>): Left<U> {
    return Left.of(id(this.value));
  }

  ap<U>(liftedF: Left<(value: L) => U>): Left<U> {
    return Left.of(id(this.value));
  }
}

class Right<R> implements IMonad<R>, IRight<R> {
  readonly value: R;

  private constructor(val: R) {
    this.value = val;
  }

  static of<R>(val: R): Right<R> {
    return new Right(val);
  }

  map<U>(f: (value: R) => U): Right<U> {
    return Right.of(f(this.value));
  }

  bind<U>(monadicF: (value: R) => Right<U>): Right<U> {
    return monadicF(this.value);
  }

  ap<U>(liftedF: Right<(value: R) => U>): Right<U> {
    // derived from bind
    return liftedF.bind(f => this.map(f));
  }
}

class Either<L, R> {
  private constructor() {}

  static left<L, R>(l: L): Left<L> {
    return Left.of(l);
  }

  static right<L, R>(r: R): Right<R> {
    return Right.of(r);
  }

  static isLeft<T>(l: T): boolean {
    return Left.isLeft(l);
  }
}

export default Either;
