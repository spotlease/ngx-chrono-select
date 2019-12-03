import { Injectable, EventEmitter } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

@Injectable()
export class NgxChronoSelectOverlayRef {
  label: string;

  afterClose: EventEmitter<Date>;

  initialDate = new Date();

  minDate: Date;
  maxDate: Date;

  constructor(private overlayRef: OverlayRef) {
    this.afterClose = new EventEmitter();
  }

  dispose() {
    this.overlayRef.dispose();
  }
}
