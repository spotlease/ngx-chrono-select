import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChronoSelectLibComponent } from './ngx-chrono-select-lib.component';

describe('NgxChronoSelectLibComponent', () => {
  let component: NgxChronoSelectLibComponent;
  let fixture: ComponentFixture<NgxChronoSelectLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxChronoSelectLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChronoSelectLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
