import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronoSelectComponent } from './chrono-select.component';

describe('ChronoSelectComponent', () => {
  let component: ChronoSelectComponent;
  let fixture: ComponentFixture<ChronoSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronoSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
