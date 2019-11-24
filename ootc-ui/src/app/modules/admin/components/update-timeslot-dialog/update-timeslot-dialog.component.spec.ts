import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTimeslotDialogComponent } from './update-timeslot-dialog.component';

describe('UpdateTimeslotDialogComponent', () => {
  let component: UpdateTimeslotDialogComponent;
  let fixture: ComponentFixture<UpdateTimeslotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTimeslotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTimeslotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
