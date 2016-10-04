# TypeScript Calculator
[Demo (https://jomcode.github.io/tscalc/)](https://jomcode.github.io/tscalc/)

`calculator:: input * state -> state`

## States

### ZeroState

### AccumulatorState

### ComputedState

## TODO
- `Either` implementation
- `ErrorState` implementation
- `getComputedState` create ErrorState
- break state handlers switch cases up into delegated helper functions for
Zero, NonZeroDigit, Operation, Equals, Clear etc
- move Maybe creation to state factories?
- make test descriptions more detailed/relevant
- refactor and use `"strictNullchecks": true` in tsconfig
- styling / animations
