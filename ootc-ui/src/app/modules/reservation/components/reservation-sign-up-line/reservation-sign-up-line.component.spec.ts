import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSignUpLineComponent } from './reservation-sign-up-line.component';

describe('ReservationSignUpLineComponent', () => {
  let component: ReservationSignUpLineComponent;
  let fixture: ComponentFixture<ReservationSignUpLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSignUpLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSignUpLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
