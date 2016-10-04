/* States */
import accumulator from './accumulator';
import computed from './computed';
import zero from './zero';
import { handleErrorState, errorStateFactory } from './error';

const error = {
  factory: errorStateFactory,
  handler: handleErrorState
};

export default {
  accumulator,
  computed,
  zero,
  error
};
