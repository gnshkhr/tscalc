const factory: AccumulatorStateFactory =
  (
    pendingOperation: Maybe<PendingOperation>,
    digits: DigitAccumulator
  ): AccumulatorState => {
  const state: AccumulatorState = {
    kind: 'accumulatorState',
    pendingOperation,
    digits
  };

  return state;
};

export default factory;
