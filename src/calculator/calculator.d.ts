/* Start Input Digits */
type Zero = "0";
type One = "1";
type Two = "2";
type Three = "3";
type Four = "4";
type Five = "5";
type Six = "6";
type Seven = "7";
type Eight = "8";
type Nine = "9";

type NonZeroDigit
  = One
  | Two
  | Three
  | Four
  | Five
  | Six
  | Seven
  | Eight
  | Nine;
/* Stop Input Digits */

/* Start Operations */
type Add = "add";
type Subtract = "subtract";
type Multiply = "multiply";
type Divide = "divide";

type Operation
  = Add
  | Subtract
  | Multiply
  | Divide;

type PendingOperation = [Operation, number];
/* Stop Operations */

/* Start Calculator States */
type ZeroStateKind = "zeroState";
type AccumulatorStateKind = "accumulatorState";
type ComputedStateKind = "computedState";
type ErrorStateKind = "errorState";

type DivideByZero = "Cannot divide by zero";

type DigitAccumulator = string;
type ComputedDisplay = number;
type OperationError = DivideByZero;

type OperationResult
  = IRight<number>
  | ILeft<OperationError>;

interface ZeroState {
  readonly kind: ZeroStateKind;
  readonly pendingOperation: IMaybe<PendingOperation>;
}

interface AccumulatorState {
  readonly kind: AccumulatorStateKind;
  readonly digits: DigitAccumulator;
  readonly pendingOperation: IMaybe<PendingOperation>;
}

interface ComputedState {
  readonly kind: ComputedStateKind;
  readonly display: ComputedDisplay;
  readonly pendingOperation: IMaybe<PendingOperation>;
}

interface ErrorState {
  readonly kind: ErrorStateKind;
  readonly error: OperationError;
}

type CalculatorState
  = ZeroState
  | AccumulatorState
  | ComputedState;

interface ComputedStateFactory {
  (
    pendingOperation: IMaybe<PendingOperation>,
    display: number
  ): ComputedState;
}

interface AccumulatorStateFactory {
  (
    pendingOperation: IMaybe<PendingOperation>,
    digits: DigitAccumulator
  ): AccumulatorState
}

interface ZeroStateFactory {
  (pendingOperation: IMaybe<PendingOperation>): ZeroState
}
/* Stop Calculator States */

/* Start Calculator Services */
// AccumulateNonZero : NonZeroDigit * DigitAccumulator -> DigitAccumulator
interface AccumulateNonZero {
  (nzd: NonZeroDigit, da: DigitAccumulator): DigitAccumulator;
}

// AccumulateZero : DigitAccumulator -> DigitAccumulator
interface AccumulateZero {
  (da: DigitAccumulator): DigitAccumulator;
}

// PerformOperation : Operation * number * number -> OperationResult
interface PerformOperation {
  (op: Operation, x: number, y: number): OperationResult;
}

// GetNumberFromAccumulator : AccumulatorState -> number
interface GetNumberFromAccumulator {
  (as: AccumulatorState): number;
}

// GetDisplayFromState : CalculatorState -> string
interface GetDisplayFromState {
  (cs: CalculatorState): string;
}

// GetPendingFromState : CalculatorState -> string
interface GetPendingFromState {
  (cs: CalculatorState): string;
}

interface CalculatorServices {
  accumulateNonZero: AccumulateNonZero;
  accumulateZero: AccumulateZero;
  performOperation: PerformOperation;
  getNumberFromAccumulator: GetNumberFromAccumulator;
  getDisplayFromState: GetDisplayFromState;
  getPendingFromState: GetPendingFromState;
}
/* Stop Calculator Services */

type Equals = "equals";
type Clear = "clear";

type Input
  = Zero
  | NonZeroDigit
  | Operation
  | Equals
  | Clear;

// Calculator : Input * CalculatorState -> CalculatorState
interface Calculator {
  (input: Input, state: CalculatorState): CalculatorState;
}
