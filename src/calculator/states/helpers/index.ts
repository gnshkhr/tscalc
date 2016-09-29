/* States Helper Functions */
import accumulateNonZero from './accumulatenonzero';
import accumulateZero from './accumulatezero';
import getComputedState from './getcomputedstate';
import ifNone from './ifnone';
import replacePending from './replacepending';

import accumulatorFactory from '../accumulator/factory';
import computedFactory from '../computed/factory';
import zeroFactory from '../zero/factory';

export default {
  accumulateNonZero: accumulateNonZero(accumulatorFactory),
  accumulateZero: accumulateZero(zeroFactory),
  getComputedState: getComputedState(ifNone, computedFactory),
  ifNone,
  replacePending: replacePending(computedFactory),
};
