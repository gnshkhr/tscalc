interface IFunctor<T> {
  map<U>(f: (value: T) => U): IFunctor<U>;
}

interface IPointedFunctor<T> {
  // of<T>(value: T): IPointedFunctor<T>;
}

interface IApplicative<T> {
  ap<U>(liftedF: IApplicative<(value: T) => U>): IApplicative<U>;
}

interface IMonad<T> extends IFunctor<T>, IPointedFunctor<T>, IApplicative<T> {
  bind<U>(monadicF: (value: T) => IMonad<U>): IMonad<U>;
}

interface IMaybe<T> extends IMonad<T> {
  isNothing(): boolean;
  some(): T;
}

interface ILeft<L> {
  value: L;
}

interface IRight<R> {
  value: R;
}
