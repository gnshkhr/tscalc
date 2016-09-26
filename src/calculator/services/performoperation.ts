const performOperation = (): PerformOperation => {
  const handleAdd = (x: number, y: number): number => x + y;
  const handleSubtract = (x: number, y: number): number => x - y;
  const handleMultiply = (x: number, y: number): number => x * y;
  const handleDivide = (x: number, y: number): number => x / y;

  return (operation: Operation, x: number, y: number): OperationResult => {
    switch (operation) {
      case 'add': { return handleAdd(x, y); }
      case 'subtract': { return handleSubtract(x, y); }
      case 'multiply': { return handleMultiply(x, y); }
      case 'divide': { return handleDivide(x, y); }
    }
  };
};

export default performOperation;
