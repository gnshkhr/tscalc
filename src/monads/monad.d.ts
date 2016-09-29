interface Functor<T> {
  map<U>(f: (value: T) => U): Functor<U>;
}

interface Applicative<T> {
  ap<U>(f: Applicative<(value: T) => U>): Applicative<U>;
}

interface Monad<T> extends Functor<T>, Applicative<T> {
  bind<U>(f: (value: T) => Monad<U>): Monad<U>;
}

interface MonadFactory extends Function {
  <T>(value: T): Monad<T>;
}

interface MonadStatic {
  of: MonadFactory
}

interface Maybe<T> extends Monad<T> {
  isNothing(): boolean;
  some(): T;
}

declare var Identity: MonadStatic;
declare var Maybe: MonadStatic;

// monadic function interface / annotation / alias ??
// interface MonadicFunction<T> {
  // (val: T): Monad<T>;
// }
// type MonadicFunction<T> = (val: T) => Monad<T>;

// works
// const addOne: <T>(x: T) => Identity<T> =
        // (x: number): Identity<number> => Identity.of(x + 1);
