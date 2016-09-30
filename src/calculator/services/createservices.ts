import accumulateNonZero from './accumulatenonzero';
import accumulateZero from './accumulatezero';
import performOperation from './performoperation';
import getNumberFromAccumulator from './getnumberfromaccumulator';
import getDisplayFromState from './getdisplayfromstate';
import getPendingFromState from './getpendingfromstate';

import appendToAccumulator from './helpers/appendtoaccumulator';

const createServices = (): CalculatorServices => {
  return {
    accumulateNonZero: accumulateNonZero(appendToAccumulator),
    accumulateZero: accumulateZero(appendToAccumulator),
    performOperation: performOperation(),
    getNumberFromAccumulator: getNumberFromAccumulator(),
    getDisplayFromState: getDisplayFromState(getNumberFromAccumulator()),
    getPendingFromState: getPendingFromState(),
  };
};

export default createServices;
