import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronoSelectOverlayComponent } from './chrono-select-overlay.component';

describe('ChronoSelectOverlayComponent', () => {
  let component: ChronoSelectOverlayComponent;
  let fixture: ComponentFixture<ChronoSelectOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronoSelectOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronoSelectOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
