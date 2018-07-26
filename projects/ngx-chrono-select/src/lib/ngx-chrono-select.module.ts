import { NgModule } from '@angular/core';

import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import 'hammerjs';

import { ChronoSelectTriggerDirective } from './chrono-select-trigger/chrono-select-trigger.directive';
import { ChronoSelectComponent } from './chrono-select/chrono-select.component';
import { ChronoSelectInputDirective } from './chrono-select-input/chrono-select-input.directive';
import { ChronoSelectOverlayComponent } from './chrono-select-overlay/chrono-select-overlay.component';
import { ChronoSelectDrumComponent } from './chrono-select-drum/chrono-select-drum.component';
import { ChronoSelectHammerGestureConfig } from './hammer-config';

@NgModule({
  imports: [BrowserModule, OverlayModule],
  declarations: [
    ChronoSelectTriggerDirective,
    ChronoSelectComponent,
    ChronoSelectInputDirective,
    ChronoSelectOverlayComponent,
    ChronoSelectDrumComponent
  ],
  entryComponents: [ChronoSelectOverlayComponent],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ChronoSelectHammerGestureConfig
    }
  ],
  exports: [ChronoSelectComponent, ChronoSelectInputDirective, ChronoSelectTriggerDirective]
})
export class NgxChronoSelectModule {}
