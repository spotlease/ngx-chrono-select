import { Injectable, EventEmitter } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

@Injectable()
export class ChronoSelectOverlayRef {
  afterClose: EventEmitter<Date>;

  initialDate = new Date();

  constructor(private overlayRef: OverlayRef) {
    this.afterClose = new EventEmitter();
  }

  dispose() {
    this.overlayRef.dispose();
  }
}
