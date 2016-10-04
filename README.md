# TypeScript Calculator

[![Build Status](https://travis-ci.org/jomcode/tscalc.svg?branch=master)](https://travis-ci.org/jomcode/tscalc)
[![Test Coverage](https://codeclimate.com/github/jomcode/tscalc/badges/coverage.svg)](https://codeclimate.com/github/jomcode/tscalc/coverage)

[Demo (https://jomcode.github.io/tscalc/)](https://jomcode.github.io/tscalc/)

`calculator:: input * state -> state`

## States

### ZeroState
| Input | Result | Next State |
| --- | --- | --- |
| Zero | Nothing. | ZeroState |
| NonZeroDigit | Append digit to new accumulator. | AccumulatorState |
| Operation | If pending op, calculate and create next pending from input. Else create pending op. | ComputedState |
| Equals | Compute from pending op. No resulting pending ops created. | ComputedState |
| Clear | Nothing. | ZeroState |

### AccumulatorState
| Input | Result | Next State |
| --- | --- | --- |
| Zero | Append zero to accumulator. | AccumulatorState |
| NonZeroDigit | Append digit to accumulator. | AccumulatorState |
| Operation | If pending op, update display with OperationResult. If successful, create pending op. | ComputedState |
| Equals | Compute from pending op. No resulting pending ops created. | ComputedState |
| Clear | Clear any pending and go to ZeroState. | ZeroState |

### ComputedState
| Input | Result | Next State |
| --- | --- | --- |
| Zero | Go to ZeroState with current pending op if exists. | ZeroState |
| NonZeroDigit | Append digit to new accumulator. Keep pending op if exists. | AccumulatorState |
| Operation | Replace any pending op with new one from input. | ComputedState |
| Equals | Clear pending op. | ComputedState |
| Clear | Clear any pending and go to ZeroState. | ZeroState |

### ErrorState
| Input | Result | Next State |
| --- | --- | --- |
| All Except Clear | Nothing. | ErrorState |
| Clear | Clear any pending and go to ZeroState. | ZeroState |

## TODO
- ng2 tests
- `Either` tests
- make tests more descriptive
- refactor tests to be less brittle
- decimal?
- negate?
- square rt?
