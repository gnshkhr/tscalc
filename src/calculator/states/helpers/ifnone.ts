import { curry } from 'ramda';

// TODO typing?
const ifNone = (defaultVal, input) => {
  return !input ? defaultVal : input;
};

const helper = curry(ifNone);

export default helper;
