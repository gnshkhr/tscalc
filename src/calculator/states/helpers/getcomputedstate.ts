import { curry } from 'ramda';

import { Maybe } from '../../../monads';

const getComputedStateHelper =
  (
    ifNoneFunc,
    compFactory: ComputedStateFactory,
    services: CalculatorServices,
    state: AccumulatorState,
    nextOperation: Operation
  ): ComputedState => {
  return compFactory(Maybe.of(null), 0);
};

const helper = curry(getComputedStateHelper);

export default helper;
