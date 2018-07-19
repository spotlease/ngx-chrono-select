import { TestBed, inject } from '@angular/core/testing';

import { NgxChronoSelectLibService } from './ngx-chrono-select-lib.service';

describe('NgxChronoSelectLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxChronoSelectLibService]
    });
  });

  it('should be created', inject([NgxChronoSelectLibService], (service: NgxChronoSelectLibService) => {
    expect(service).toBeTruthy();
  }));
});
