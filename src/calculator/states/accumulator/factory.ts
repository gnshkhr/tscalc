const factory = (pendingOperation, digits): AccumulatorState => {
  const state: AccumulatorState = {
    kind: 'accumulatorState',
    pendingOperation,
    digits
  };

  return state;
};

export default factory;
