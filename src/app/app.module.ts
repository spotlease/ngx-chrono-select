import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxChronoSelectLibModule } from 'ngx-chrono-select-lib';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxChronoSelectLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
