import accumulateNonZero from './accumulatenonzero';
import accumulateZero from './accumulatezero';
import performOperation from './performoperation';
import getNumberFromAccumulator from './getnumberfromaccumulator';
import getDisplayFromState from './getdisplayfromstate';
import getPendingFromState from './getpendingfromstate';

const createServices = (): CalculatorServices => {
  return {
    accumulateNonZero: accumulateNonZero(),
    accumulateZero: accumulateZero(),
    performOperation: performOperation(),
    getNumberFromAccumulator: getNumberFromAccumulator(),
    getDisplayFromState: getDisplayFromState(),
    getPendingFromState: getPendingFromState(),
  };
};

export default createServices;
