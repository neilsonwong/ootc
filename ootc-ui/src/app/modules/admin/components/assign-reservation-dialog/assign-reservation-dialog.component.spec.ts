import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReservationDialogComponent } from './assign-reservation-dialog.component';

describe('AssignReservationDialogComponent', () => {
  let component: AssignReservationDialogComponent;
  let fixture: ComponentFixture<AssignReservationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignReservationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
