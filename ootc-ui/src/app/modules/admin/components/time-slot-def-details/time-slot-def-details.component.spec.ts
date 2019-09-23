import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotDefDetailsComponent } from './time-slot-def-details.component';

describe('TimeSlotDefDetailsComponent', () => {
  let component: TimeSlotDefDetailsComponent;
  let fixture: ComponentFixture<TimeSlotDefDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotDefDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotDefDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
