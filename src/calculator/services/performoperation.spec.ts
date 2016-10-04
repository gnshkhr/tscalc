import { Either } from '../../generic';

import performOperation from './performoperation';

describe('PerformOperation CalculatorService', () => {
  describe('performing "add"', () => {
    it('returns expected result', () => {
      const testOp: Operation = 'add';
      const testX = 10;
      const testY = 5;

      const result = performOperation()(testOp, testX, testY);
      const expectedResult = Either.of(15);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('performing "subtract"', () => {
    it('returns expected result', () => {
      const testOp: Operation = 'subtract';
      const testX = 10;
      const testY = 5;

      const result = performOperation()(testOp, testX, testY);
      const expectedResult = Either.of(5);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('performing "multiply"', () => {
    it('returns expected result', () => {
      const testOp: Operation = 'multiply';
      const testX = 10;
      const testY = 5;

      const result = performOperation()(testOp, testX, testY);
      const expectedResult = Either.of(50);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('performing "divide"', () => {
    it('returns expected result', () => {
      const testOp: Operation = 'divide';
      const testX = 10;
      const testY = 5;

      const result = performOperation()(testOp, testX, testY);
      const expectedResult = Either.of(2);

      expect(result).toEqual(expectedResult);
    });

    it('returns Left<OperationError>(DivideByZeroError)', () => {
      const testOp: Operation = 'divide';
      const testX = 10;
      const testY = 0;

      const result = performOperation()(testOp, testX, testY);
      const expectedResult = Either.left('Cannot divide by zero');

      expect(result).toEqual(expectedResult);
    });
  });
});
