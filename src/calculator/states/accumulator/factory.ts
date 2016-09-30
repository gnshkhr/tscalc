const factory: AccumulatorStateFactory =
  (
    pendingOperation: IMaybe<PendingOperation>,
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
