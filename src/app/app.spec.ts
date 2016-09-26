import { inject, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('App', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppComponent
    ]
  }));

  it('should', inject([AppComponent], (app: AppComponent) => {
    expect(1).toEqual(1);
  }));

  it('foo', () => { pending(); });
});
