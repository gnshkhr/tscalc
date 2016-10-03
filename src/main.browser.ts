import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import './main.scss';
import { AppModule } from './app';

function main(): Promise<any> {
  if (process.env.NODE_ENV === 'production') enableProdMode();
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(e => console.error(e));
}

document.addEventListener('DOMContentLoaded', main);
