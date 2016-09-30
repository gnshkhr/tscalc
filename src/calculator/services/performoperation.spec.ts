import performOperation from './performoperation';

describe('PerformOperation CalculatorService', () => {
  describe('performing "add"', () => {
    it('returns expected result', () => {
      const testOp: Operation = 'add';
      const testX = 10;
      const testY = 5;

      const result = performOperation()(testOp, testX, testY);
      const expectedResult = 15;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('performing "subtract"', () => {
    it('returns expected result', () => {
      const testOp: Operation = 'subtract';
      const testX = 10;
      const testY = 5;

      const result = performOperation()(testOp, testX, testY);
      const expectedResult = 5;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('performing "multiply"', () => {
    it('returns expected result', () => {
      const testOp: Operation = 'multiply';
      const testX = 10;
      const testY = 5;

      const result = performOperation()(testOp, testX, testY);
      const expectedResult = 50;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('performing "divide"', () => {
    it('returns expected result', () => {
      const testOp: Operation = 'divide';
      const testX = 10;
      const testY = 5;

      const result = performOperation()(testOp, testX, testY);
      const expectedResult = 2;

      expect(result).toEqual(expectedResult);
    });
  });
});
