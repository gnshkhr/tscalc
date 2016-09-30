/* Services */
import accumulateNonZero from './accumulatenonzero';
import accumulateZero from './accumulatezero';
import performOperation from './performoperation';
import getNumberFromAccumulator from './getnumberfromaccumulator';
import getDisplayFromState from './getdisplayfromstate';
import getPendingFromState from './getpendingfromstate';
import createServices from './createservices';

import appendToAccumulator from './helpers/appendtoaccumulator';

export default {
  accumulateNonZero: accumulateNonZero(appendToAccumulator),
  accumulateZero,
  performOperation,
  getNumberFromAccumulator,
  getDisplayFromState,
  getPendingFromState,
  createServices
};
