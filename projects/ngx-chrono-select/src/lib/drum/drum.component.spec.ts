import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChronoSelectDrumComponent } from './drum.component';

describe('ChronoSelectDrumComponent', () => {
  let component: NgxChronoSelectDrumComponent;
  let fixture: ComponentFixture<ChronoSelectDrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxChronoSelectDrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChronoSelectDrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
