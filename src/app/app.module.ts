import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonModule } from '@angular2-material/button';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, MdButtonModule.forRoot()],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {}

export { AppModule };
