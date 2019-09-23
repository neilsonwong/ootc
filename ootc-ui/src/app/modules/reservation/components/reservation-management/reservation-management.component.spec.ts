import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationManagementComponent } from './reservation-management.component';

describe('ReservationManagementComponent', () => {
  let component: ReservationManagementComponent;
  let fixture: ComponentFixture<ReservationManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
