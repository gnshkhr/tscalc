import 'core-js/es6';
import 'core-js/es7';

import 'zone.js/dist/zone';

// definitions since noEmitHelpers is true in tsconfig.json
import 'ts-helpers';

if (process.env.NODE_ENV !== 'production') {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
