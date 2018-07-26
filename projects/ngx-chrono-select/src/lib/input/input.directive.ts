import { Directive, Input, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';

import { NgxChronoSelectComponent } from '../select/select.component';
import { Subscription } from 'rxjs';

@Directive({
  selector: 'input[ngxChronoSelect]'
})
export class NgxChronoSelectInputDirective implements OnInit, OnDestroy {
  @Input() ngxChronoSelect: NgxChronoSelectComponent;

  private subscription: Subscription;

  constructor(private el: ElementRef) {
  }

  @HostListener('focus')
  onFocus() {
    this.ngxChronoSelect.show();
  }

  ngOnInit() {
    this.subscription = this.ngxChronoSelect.select.subscribe((newDate: Date) => {
      this.el.nativeElement.value = newDate.toString();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
