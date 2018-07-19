import {
  Directive,
  Input,
  HostListener
} from '@angular/core';

import { ChronoSelectComponent } from '../chrono-select/chrono-select.component';

@Directive({
  selector: '[ngxChronoSelectTrigger]'
})
export class ChronoSelectTriggerDirective {

  @Input() ngxChronoSelectTrigger: ChronoSelectComponent;


  @HostListener('click')
  onClick() {
    this.ngxChronoSelectTrigger.show();
  }

  constructor() {
  }

}
