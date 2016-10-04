class Left<L> implements ILeft<L> {
  readonly value: L;

  private constructor(val: L) {
    this.value = val;
  }

  static of<L>(val: L): Left<L> {
    return new Left<L>(val);
  }

  map(f) {
    return Left.of(this.value);
  }

  ap(f) {
    return Left.of(this.value);
  }
}

class Right<R> implements IRight<R> {
  readonly value: R;

  private constructor(val: R) {
    this.value = val;
  }

  static of<R>(val: R): Left<R> {
    return new Right<R>(val);
  }

  map(f) {
    return Right.of(f(this.value));
  }

  ap(liftedF) {
    return liftedF.map(f => f(this.value));
  }

  bind(monadicF) {
    return monadicF(this.value);
  }
}

class Either<L, R> {
  private constructor() {}

  static of<R>(val: R) {
    return Right.of<R>(val);
  }

  static right<R>(val: R) {
    return Right.of<R>(val);
  }

  static left<L>(val: L) {
    return Left.of<L>(val);
  }

  static isLeft(val) {
    return val.constructor === Left;
  }

  static isRight(val) {
    return val.constructor === Right;
  }

  static map(f, result) {
    switch (result.constructor) {
      case Left: {
        return result.map(f);
      }

      case Right: {
        return result.map(f);
      }
    }
  }

  static ap(liftedF, result) {
    if (Either.isRight(liftedF) && Either.isRight(result)) {
      return result.ap(liftedF);
    }

    if (Either.isLeft(liftedF) && Either.isRight(result)) {
      return liftedF.ap(liftedF); // return left
    }

    if (Either.isRight(liftedF) && Either.isLeft(result)) {
      return result.ap(result); // return left;
    }

    if (Either.isLeft(liftedF) && Either.isLeft(result)) {
      return liftedF.ap(liftedF); // return left
    }
  }
}

export { Either };
