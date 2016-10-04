import { Either } from '../../generic';

const performOperation = (): PerformOperation => {
  const handleAdd = (x: number, y: number): number => x + y;
  const handleSubtract = (x: number, y: number): number => x - y;
  const handleMultiply = (x: number, y: number): number => x * y;
  const handleDivide = (x: number, y: number): number => x / y;

  return (operation: Operation, x: number, y: number): OperationResult => {
    switch (operation) {
      case 'add': { return Either.of(handleAdd(x, y)); }
      case 'subtract': { return Either.of(handleSubtract(x, y)); }
      case 'multiply': { return Either.of(handleMultiply(x, y)); }
      case 'divide': {
        return y === 0 ?
          Either.left<DivideByZeroError>('Cannot divide by zero') :
          Either.of(handleDivide(x, y));
      }
    }
  };
};

export default performOperation;
