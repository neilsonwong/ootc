import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSignUpFormComponent } from './reservation-sign-up-form.component';

describe('ReservationSignUpFormComponent', () => {
  let component: ReservationSignUpFormComponent;
  let fixture: ComponentFixture<ReservationSignUpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSignUpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
