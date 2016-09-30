const factory: ZeroStateFactory =
  (pendingOperation: IMaybe<PendingOperation>): ZeroState => {
    const state: ZeroState = {
      kind: 'zeroState',
      pendingOperation
    };

    return state;
};

export default factory;
