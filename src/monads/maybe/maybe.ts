class Maybe<T> implements Monad<T>, Maybe<T> {
  readonly value: T;

  private constructor(val) {
    this.value = val;
  }

  static of<T>(val: T = null): Maybe<T> {
    return new Maybe<T>(val);
  }

  bind<U>(f: (val: T) => Maybe<U>): Maybe<U> {
    return this.isNothing() ? Maybe.of(null) : f(this.value);
  }

  map<U>(f: (value: T) => U): Maybe<U> {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.value));
  }

  ap<U>(liftedF: Maybe<(value: T) => U>): Maybe<U> {
    // derived from bind
    return this.isNothing() ? Maybe.of(null) : liftedF.bind(f => this.map(f));
  }

  isNothing(): boolean {
    return (this.value === null || this.value === undefined);
  }

  some(): T {
    return this.value;
  }

  toString(): string {
    return `Maybe(${this.value})`;
  }
}

export default Maybe;
