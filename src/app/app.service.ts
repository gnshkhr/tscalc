import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

import CalculatorLib from '../calculator';
import { Maybe } from '../generic';

const {
  createCalculator,
  states: { zero },
  services: { createServices }
} = CalculatorLib;

const services = createServices();
const calculator = createCalculator(services);

const getZeroState = (): ZeroState => {
  return zero.factory(Maybe.of(null));
};

const _input$ = new Rx.Subject(); // inputs from user

const flipBinary = func => (x, y) => func(y, x);
const flippedCalculator = flipBinary(calculator); // flip args for scan

const initialState = getZeroState(); // seed state stream with initial state

const _state$ = _input$ // reduce state from inputs
  .scan(flippedCalculator, initialState);

const getDisplay = s => services.getDisplayFromState(s);

const _display$ = _state$
  .map(getDisplay);

const getPending = s => services.getPendingFromState(s);

const _pending$ = _state$
  .map(getPending);

const _test$ = Rx.Observable.of('foo');

@Injectable()
class AppState {
  input$ = _input$;
  state$ = _state$;
  display$ = _display$;
  pending$ = _pending$;
  test$ = _test$;
}

export { AppState };
