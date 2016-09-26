import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Calculator } from './calculator';

import { AppState } from './app.service';

const APP_PROVIDERS = [
  AppState
];

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, Calculator],
  bootstrap: [AppComponent],
  providers: [APP_PROVIDERS]
})
class AppModule {}

export { AppModule };
