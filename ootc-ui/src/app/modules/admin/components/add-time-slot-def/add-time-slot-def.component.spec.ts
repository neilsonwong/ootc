import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeSlotDefComponent } from './add-time-slot-def.component';

describe('AddTimeSlotDefComponent', () => {
  let component: AddTimeSlotDefComponent;
  let fixture: ComponentFixture<AddTimeSlotDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTimeSlotDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimeSlotDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
