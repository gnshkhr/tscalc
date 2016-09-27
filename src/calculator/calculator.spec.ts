import calculator from './';

describe('calculator', () => {
  describe('creating a calculator', () => {
    it('returns a calculator', () => {
      const services = calculator.services.createServices();
      const calc = calculator.createCalculator(services);

      expect(calc).toBeDefined();
    });
  });
});
