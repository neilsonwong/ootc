import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotDetailsComponent } from './time-slot-details.component';

describe('TimeSlotDetailsComponent', () => {
  let component: TimeSlotDetailsComponent;
  let fixture: ComponentFixture<TimeSlotDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
