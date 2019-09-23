import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSignUpComponent } from './reservation-sign-up.component';

describe('ReservationSignUpComponent', () => {
  let component: ReservationSignUpComponent;
  let fixture: ComponentFixture<ReservationSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
