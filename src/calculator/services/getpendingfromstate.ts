const getPendingFromState = (): GetPendingFromState => {
  const operationToString = (operation: Operation): string => {
    switch (operation) {
      case 'add': { return '+'; }
      case 'subtract': { return '-'; }
      case 'multiply': { return '*'; }
      case 'divide': { return '/'; }
    }
  };

  const displayForPendingOperation =
    (
      pending: IMaybe<PendingOperation>
    ): string => {
      return pending.isNothing() ?
        '' :
        `${pending.some()[1]} ${operationToString(pending.some()[0])}`.trim();
  };

  return (state: CalculatorState): string => {
    // TODO fall through or get rid of switch ?
    switch (state.kind) {
      case 'zeroState': {
        return displayForPendingOperation(state.pendingOperation);
      }

      case 'accumulatorState': {
        return displayForPendingOperation(state.pendingOperation);
      }

      case 'computedState': {
        return displayForPendingOperation(state.pendingOperation);
      }
    }
  };
};

export default getPendingFromState;
