const factory: ComputedStateFactory =
  (
    pendingOperation: Maybe<PendingOperation>,
    display: number
  ): ComputedState => {
  const state: ComputedState = {
    kind: 'computedState',
    pendingOperation,
    display
  };

  return state;
};

export default factory;
