import { TestBed, inject } from '@angular/core/testing';

import { ChronoSelectOverlayRef } from './chrono-select-overlay-ref';

describe('ChronoSelectOverlayRef', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChronoSelectOverlayRef]
    });
  });

  it('should be created', inject([ChronoSelectOverlayRef], (service: ChronoSelectOverlayRef) => {
    expect(service).toBeTruthy();
  }));
});
