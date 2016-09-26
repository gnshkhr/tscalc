import { Injectable } from '@angular/core';

import calculator from '../calculator';

const { states, services, createCalculator } = calculator;

export interface State {
  calculatorState: CalculatorState;
}

const zero: ZeroState = states.zero.factory(undefined);

const initialState = {
  calculatorState: zero
};

const _state = initialState;

@Injectable()
class AppState {
  private _state = _state;

  calculator = createCalculator(services.createServices());

  setState(nextState): void {
    this._state = nextState;
  }

  getState() {
    return this._state;
  }

  getDisplayNumber(): string {
    const num = services.getDisplayFromState()(this._state.calculatorState);

    return num;
  }

  getDisplayPending(): string {
    const pending = services.getPendingFromState()(this._state.calculatorState);

    return pending;
  }

  handleInput(input) {
    const next = this.calculator(input, this._state.calculatorState);

    this.setState({ calculatorState: next });
  }

  reset(): void {
    this._state = initialState;
  }
}

export { AppState };
