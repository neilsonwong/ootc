import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingReservationListComponent } from './upcoming-reservation-list.component';

describe('UpcomingReservationListComponent', () => {
  let component: UpcomingReservationListComponent;
  let fixture: ComponentFixture<UpcomingReservationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingReservationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
