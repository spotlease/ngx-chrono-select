import { Component, Injector, Output, EventEmitter } from '@angular/core';

import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { NgxChronoSelectOverlayComponent } from '../overlay/overlay.component';
import { NgxChronoSelectOverlayRef } from '../overlay-ref/overlay-ref';

@Component({
  selector: 'ngx-chrono-select',
  template: ''
})
export class NgxChronoSelectComponent {

  @Output() select = new EventEmitter<Date>();

  selectedDate = new Date();

  constructor(private overlay: Overlay, private injector: Injector) {}

  show(initialDate?: Date) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .bottom();

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
    chronoSelectOverlayRef.initialDate = initialDate || this.selectedDate;

    const injector = this.createInjector(overlayRef, chronoSelectOverlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const chronoSelectPortal = new ComponentPortal(NgxChronoSelectOverlayComponent, null, injector);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(chronoSelectPortal);

    overlayRef.backdropClick().subscribe(_ => overlayRef.dispose());

    chronoSelectOverlayRef.afterClose.subscribe((selectedDate) => {
      this.selectedDate = selectedDate;
      this.select.emit(selectedDate);
    });
  }

  private createInjector(overlayRef: OverlayRef, chronoSelectOverlayRef: NgxChronoSelectOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(OverlayRef, overlayRef);
    injectionTokens.set(NgxChronoSelectOverlayRef, chronoSelectOverlayRef);

    return new PortalInjector(this.injector, injectionTokens);
  }
}
