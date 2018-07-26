import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChronoSelectOverlayComponent } from './overlay.component';

describe('ChronoSelectOverlayComponent', () => {
  let component: NgxChronoSelectOverlayComponent;
  let fixture: ComponentFixture<ChronoSelectOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxChronoSelectOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChronoSelectOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
