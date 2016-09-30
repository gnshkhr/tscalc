class Identity<T> implements IMonad<T> {
  readonly value: T;

  private constructor(val: T) {
    this.value = val;
  }

  static of<T>(value: T): Identity<T> {
    return new Identity<T>(value);
  }

  ap<U>(liftedF: Identity<(value: T) => U>): Identity<U> {
    // derived from bind
    return liftedF.bind(f => this.map(f));
  }

  bind<U>(f: (value: T) => Identity<U>): Identity<U> {
    return f(this.value);
  }

  map<U>(f: (value: T) => U): Identity<U> {
    return Identity.of(f(this.value));
  }

  toString(): string {
    return `Identity(${this.value})`;
  }
}

export default Identity;
