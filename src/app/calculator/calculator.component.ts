import { Component } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  selector: 'calculator-gui',
  styleUrls: ['./calculator.style.scss'],
  templateUrl: './calculator.template.html'
})
class Calculator {
  localDisplayNumber;
  localDisplayPending;

  constructor(public appState: AppState) {}

  onNumberClick(input) {
    const inputToString = x => "" + x;

    this.appState.handleInput(inputToString(input));
    this.localDisplayNumber = this.appState.getDisplayNumber();
    this.localDisplayPending = this.appState.getDisplayPending();
  }

  ngOnInit() {
    this.localDisplayNumber = this.appState.getDisplayNumber();
  }
}

export { Calculator };
