import { Injectable, EventEmitter } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

@Injectable()
export class ChronoSelectOverlayRef {
  afterClose: EventEmitter<Date>;

  constructor(private overlayRef: OverlayRef, public initialDate: Date) {
    this.afterClose = new EventEmitter();
  }

  dispose() {
    this.overlayRef.dispose();
  }
}
