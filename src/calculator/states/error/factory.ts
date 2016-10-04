const errorStateFactory: ErrorStateFactory = (error: OperationError) => {
  const state: ErrorState = {
    kind: 'errorState',
    error
  };

  return state;
};

export { errorStateFactory };
