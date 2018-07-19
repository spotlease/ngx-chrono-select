import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronoSelectDrumComponent } from './chrono-select-drum.component';

describe('ChronoSelectDrumComponent', () => {
  let component: ChronoSelectDrumComponent;
  let fixture: ComponentFixture<ChronoSelectDrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronoSelectDrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronoSelectDrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
