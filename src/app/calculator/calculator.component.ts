import { Component } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  selector: 'calculator-gui',
  styleUrls: ['./calculator.style.scss'],
  templateUrl: './calculator.template.html'
})
class Calculator {
  constructor(private appState: AppState) {}

  onInput(val) {
    this.appState.input$.next(val);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}

export { Calculator };
