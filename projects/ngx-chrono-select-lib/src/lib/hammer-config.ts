import { HammerGestureConfig } from '@angular/platform-browser';

export class ChronoSelectHammerGestureConfig extends HammerGestureConfig {
  overrides = <any>{
    pan: { direction: Hammer.DIRECTION_ALL }
  };
}
