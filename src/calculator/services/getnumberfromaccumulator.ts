const getNumberFromAccumulator = (): GetNumberFromAccumulator => {
  return (state: AccumulatorState): number => {
    return state.digits.length < 1 ?
      0 :
      parseFloat(state.digits.slice());
  };
};

export default getNumberFromAccumulator;
