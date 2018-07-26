import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChronoSelectComponent } from './select.component';

describe('ChronoSelectComponent', () => {
  let component: NgxChronoSelectComponent;
  let fixture: ComponentFixture<ChronoSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxChronoSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChronoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
