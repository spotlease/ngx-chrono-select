import {
  Directive,
  Input,
  HostListener
} from '@angular/core';

import { NgxChronoSelectComponent } from '../select/select.component';

@Directive({
  selector: '[ngxChronoSelectTrigger]'
})
export class NgxChronoSelectTriggerDirective {

  @Input() ngxChronoSelectTrigger: NgxChronoSelectComponent;


  @HostListener('click')
  onClick() {
    this.ngxChronoSelectTrigger.show();
  }

  constructor() {
  }

}
