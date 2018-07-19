import { Component, Injector, Output, EventEmitter } from '@angular/core';

import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ChronoSelectOverlayComponent } from '../chrono-select-overlay/chrono-select-overlay.component';
import { ChronoSelectOverlayRef } from '../chrono-select-overlay-ref/chrono-select-overlay-ref';

@Component({
  selector: 'ngx-chrono-select',
  templateUrl: './chrono-select.component.html',
  styleUrls: ['./chrono-select.component.scss']
})
export class ChronoSelectComponent {

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
      backdropClass: 'dark-backdrop',
      panelClass: 'ngx-chrono-select-overlay-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.overlay.create(overlayConfig);

    const chronoSelectOverlayRef = new ChronoSelectOverlayRef(overlayRef, initialDate || this.selectedDate);

    const injector = this.createInjector(chronoSelectOverlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const chronoSelectPortal = new ComponentPortal(ChronoSelectOverlayComponent, null, injector);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(chronoSelectPortal);

    overlayRef.backdropClick().subscribe(_ => overlayRef.dispose());

    chronoSelectOverlayRef.afterClose.subscribe((selectedDate) => {
      this.selectedDate = selectedDate;
      this.select.emit(selectedDate);
    });
  }

  private createInjector(chronoSelectOverlayRef: ChronoSelectOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(ChronoSelectOverlayRef, chronoSelectOverlayRef);

    return new PortalInjector(this.injector, injectionTokens);
  }
}
