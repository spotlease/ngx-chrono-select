import { NgModule } from '@angular/core';

import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import 'hammerjs';

import { NgxChronoSelectTriggerDirective } from './trigger/trigger.directive';
import { NgxChronoSelectComponent } from './select/select.component';
import { NgxChronoSelectInputDirective } from './input/input.directive';
import { NgxChronoSelectOverlayComponent } from './overlay/overlay.component';
import { NgxChronoSelectDrumComponent } from './drum/drum.component';
import { NgxChronoSelectHammerGestureConfig } from './hammer-config';

@NgModule({
  imports: [BrowserModule, OverlayModule],
  declarations: [
    NgxChronoSelectTriggerDirective,
    NgxChronoSelectComponent,
    NgxChronoSelectInputDirective,
    NgxChronoSelectOverlayComponent,
    NgxChronoSelectDrumComponent
  ],
  entryComponents: [NgxChronoSelectOverlayComponent],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: NgxChronoSelectHammerGestureConfig
    }
  ],
  exports: [NgxChronoSelectComponent, NgxChronoSelectInputDirective, NgxChronoSelectTriggerDirective]
})
export class NgxChronoSelectModule {}
