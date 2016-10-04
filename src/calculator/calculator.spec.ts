import { Maybe } from '../generic';
import calculator from './';

describe('calculator', () => {
  describe('creating a calculator', () => {
    it('returns a calculator', () => {
      const services = calculator.services.createServices();
      const calc = calculator.createCalculator(services);

      expect(calc).toBeDefined();
    });
  });

  describe('using the calculator', () => {
    it('calculates', () => {
      const services = calculator.services.createServices();
      const calc = calculator.createCalculator(services);

      const initialState = calculator.states.zero.factory(Maybe.of(null));

      const inputOne = calc('1', initialState);
      const inputAdd = calc('add', inputOne);
      const inputFive = calc('5', inputAdd);
      const inputMultiply = calc('multiply', inputFive);
      const inputNine = calc('9', inputMultiply);
      const inputSubtract = calc('subtract', inputNine);
      const inputFour = calc('4', inputSubtract);
      const inputMultiplyAgain = calc('multiply', inputFour);
      const inputDivide = calc('divide', inputMultiplyAgain);
      const inputTwo = calc('2', inputDivide);

      const inputEquals = calc('equals', inputTwo);

      const result: ComputedState = <ComputedState>inputEquals;

      expect(result.display).toEqual(25);
    });
  });
});
