#
[Demo (https://jomcode.github.io/tscalc/)](https://jomcode.github.io/tscalc/)

`calculator:: input * state -> state`

## TODO
- `Either` implementation
- `ErrorState` implementation
- `getComputedState` create ErrorState
- break state handlers switch cases up into delegated helper functions for
Zero, NonZeroDigit, Operation, Equals, Clear etc
- move Maybe creation to state factories?
- make test descriptions less generic
- refactor and use `"strictNullchecks": true` in tsconfig