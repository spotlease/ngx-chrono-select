import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgxChronoSelectModule } from 'ngx-chrono-select';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxChronoSelectModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
