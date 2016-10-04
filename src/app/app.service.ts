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

// const _input$ = new Rx.Subject(); // inputs from user
const _input$ = new Rx.BehaviorSubject('0'); // inputs from user

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

// start test
const STATE_UPDATE = 'test$/STATE_UPDATE';
const INPUT_UPDATE = 'test$/INPUT_UPDATE';
const DISPLAY_UPDATE = 'test$/DISPLAY_UPDATE';
const PENDING_UPDATE = 'test$/PENDING_UPDATE';

const createAction = type => payload => ({ type, payload });

const createStateUpdate = createAction(STATE_UPDATE);
const createInputUpdate = createAction(INPUT_UPDATE);
const createDisplayUpdate = createAction(DISPLAY_UPDATE);
const createPendingUpdate = createAction(PENDING_UPDATE);

const stateUpdate$ = _state$
  .map(createStateUpdate);

const is = a => x => a(x);
const isClearInput = x => x === 'clear';
const isEqualsInput = x => x === 'equals';

const or = (a, b) => x => a(x) || b(x);
const isClearOrEqualsInput = or(isClearInput, isEqualsInput); // for filter

const inputUpdate$ = _input$ // map clear and equals input updates to actions
  .filter(isClearOrEqualsInput)
  .map(createInputUpdate);

const displayUpdate$ = _display$ // map display updates to actions
  .map(createDisplayUpdate);

const pendingUpdate$ = _pending$ // map pending updates to actions
  .map(createPendingUpdate);

const action$ = Rx.Observable // merge into action stream
  .merge(stateUpdate$, inputUpdate$, displayUpdate$, pendingUpdate$);

const testInitialState = {
  calculatorState: {
    kind: 'zeroState',
    hasPending: false
  },
  display: '',
  pending: ''
};

const testReducer = (state, action) => {
  switch (action.type) {
    case STATE_UPDATE: {
      if (action.payload.kind === 'errorState') {
        const nextState = Object.assign({}, state, {
          calculatorState: {
            kind: 'errorState',
            hasPending: false,
            error: action.payload.error
          }
        });

        return nextState;
      }


      const nextState = Object.assign({}, state, {
        calculatorState: {
          kind: action.payload.kind,
          hasPending: !action.payload.pendingOperation.isNothing()
        }
      });

      return nextState;
    }

    case INPUT_UPDATE: {
      switch (action.payload) {
        case 'clear': {
          return state;
        }

        case 'equals': {
          return state;
        }
      }
    }

    case DISPLAY_UPDATE: {
      if (action.payload.length === 0) return state;
      const nextState = Object.assign({}, state, {
        display: action.payload
      });

      return nextState;
    }

    case PENDING_UPDATE: {
      if (action.payload.length === 0) return state;
      const nextState = Object.assign({}, state, {
        pending: action.payload
      });

      return nextState;
    }
  }
};

const getTestString = state => {
  const { display, pending, calculatorState: { kind, hasPending, error } } = state;

  if (kind === 'errorState') return `${error}`;

  if (hasPending) return kind === 'computedState' ?
    `${pending}` :
    `${pending} ${display}`;

  return `${display}`;
};

const _test$ = action$ // more user friendly display for gui
  .scan(testReducer, testInitialState)
  .map(getTestString);

const _operationsDisabled$ = _state$ // if equals was pressed disable +,-,*,/
  .map(state => {
    if (state.kind === 'errorState') return true;
    if (state.pendingOperation.isNothing()) return state.kind === 'computedState';
    return false;
  });

const _errorDisplay$ = _state$ // toggle css class if currently in ErrorState
  .map(state => state.kind === 'errorState');

@Injectable()
class AppState {
  input$ = _input$;
  state$ = _state$;
  display$ = _display$;
  pending$ = _pending$;
  test$ = _test$;
  operationsDisabled$ = _operationsDisabled$;
  errorDisplay$ = _errorDisplay$;
}

export { AppState };
