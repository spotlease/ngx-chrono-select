import { HammerGestureConfig } from '@angular/platform-browser';

export class NgxChronoSelectHammerGestureConfig extends HammerGestureConfig {
  overrides = <any>{
    pan: { direction: Hammer.DIRECTION_ALL }
  };
}
