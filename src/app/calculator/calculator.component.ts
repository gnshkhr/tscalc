import { Component } from '@angular/core';

import { AppState } from '../app.service';

@Component({
  selector: 'calculator-gui',
  styleUrls: ['./calculator.style.scss'],
  templateUrl: './calculator.template.html'
})
class Calculator {
  private errorStateSubscription;
  isErrorState: boolean = false;

  constructor(private appState: AppState) {
    const self = this;
    this.errorStateSubscription =
      this.appState.errorDisplay$.subscribe((status) => {
        this.isErrorState = status;
      });
  }

  onInput(val) {
    this.appState.input$.next(val);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.errorStateSubscription.unsubscribe();
  }
}

export { Calculator };
