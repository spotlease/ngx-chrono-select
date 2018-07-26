import { TestBed, inject } from '@angular/core/testing';

import { NgxChronoSelectOverlayRef } from './overlay-ref';

describe('ChronoSelectOverlayRef', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxChronoSelectOverlayRef]
    });
  });

  it('should be created', inject([NgxChronoSelectOverlayRef], (service: NgxChronoSelectOverlayRef) => {
    expect(service).toBeTruthy();
  }));
});
