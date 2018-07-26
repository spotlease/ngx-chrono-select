import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxChronoSelectModule } from 'ngx-chrono-select';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxChronoSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
