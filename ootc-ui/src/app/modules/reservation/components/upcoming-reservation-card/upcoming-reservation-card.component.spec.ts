import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingReservationCardComponent } from './upcoming-reservation-card.component';

describe('UpcomingReservationCardComponent', () => {
  let component: UpcomingReservationCardComponent;
  let fixture: ComponentFixture<UpcomingReservationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingReservationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingReservationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
