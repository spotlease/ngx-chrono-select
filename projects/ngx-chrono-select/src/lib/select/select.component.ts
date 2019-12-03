import { Component, Injector, Output, EventEmitter, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { NgxChronoSelectOverlayComponent } from '../overlay/overlay.component';
import { NgxChronoSelectOverlayRef } from '../overlay-ref/overlay-ref';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-chrono-select',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxChronoSelectComponent),
      multi: true
    }
  ]
})
export class NgxChronoSelectComponent implements ControlValueAccessor {
  @Output() select = new EventEmitter<Date>();
  
  @Input() label: string = '';
  @Input() min: Date;
  @Input() max: Date;

  selectedDate = new Date();

  private afterCloseSubscription: Subscription;

  private cvaOnChangeFn: any;

  constructor(private overlay: Overlay, private injector: Injector) {}

  show(initialDate?: Date) {
    const positionStrategy = this.overlay
      .position()
      .global();

    if (window.innerWidth >= 576) {
      positionStrategy.centerVertically();
    } else {
      positionStrategy.bottom();
    }

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'ngx-chrono-select-overlay-backdrop',
      panelClass: 'ngx-chrono-select-overlay-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.overlay.create(overlayConfig);

    const chronoSelectOverlayRef = new NgxChronoSelectOverlayRef(overlayRef);
    chronoSelectOverlayRef.label = this.label;
    chronoSelectOverlayRef.initialDate = initialDate || this.selectedDate;
    chronoSelectOverlayRef.minDate = this.min;
    chronoSelectOverlayRef.maxDate = this.max;

    const injector = this.createInjector(overlayRef, chronoSelectOverlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const chronoSelectPortal = new ComponentPortal(NgxChronoSelectOverlayComponent, null, injector);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(chronoSelectPortal);

    overlayRef.backdropClick().subscribe(_ => overlayRef.dispose());

    if (this.afterCloseSubscription) {
      this.afterCloseSubscription.unsubscribe();
    }

    this.afterCloseSubscription = chronoSelectOverlayRef.afterClose.subscribe((selectedDate: Date) => {
      if (this.cvaOnChangeFn && selectedDate !== this.selectedDate) {
        this.cvaOnChangeFn(selectedDate);
      }
      this.selectedDate = selectedDate;
      this.select.emit(selectedDate);
    });
  }

  writeValue(value: any) {
    if (!value) {
      return;
    }
    this.selectedDate = value;
  }
  registerOnChange(fn: any) {
    this.cvaOnChangeFn = fn;
  }
  registerOnTouched(fn: any) {}

  private createInjector(
    overlayRef: OverlayRef,
    chronoSelectOverlayRef: NgxChronoSelectOverlayRef
  ): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(OverlayRef, overlayRef);
    injectionTokens.set(NgxChronoSelectOverlayRef, chronoSelectOverlayRef);

    return new PortalInjector(this.injector, injectionTokens);
  }
}
