const factory: ZeroStateFactory =
  (pendingOperation: Maybe<PendingOperation>): ZeroState => {
    const state: ZeroState = {
      kind: 'zeroState',
      pendingOperation
    };

    return state;
};

export default factory;
