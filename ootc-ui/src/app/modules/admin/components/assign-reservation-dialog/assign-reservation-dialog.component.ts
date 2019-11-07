import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Reservation } from 'src/app/models/Reservation';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { EventDetailsComponent } from 'src/app/helpers/event-details.component';

@Component({
  selector: 'app-assign-reservation-dialog',
  templateUrl: './assign-reservation-dialog.component.html',
  styleUrls: ['./assign-reservation-dialog.component.scss']
})
export class AssignReservationDialogComponent extends EventDetailsComponent implements OnInit {
  public assignReservationForm: FormGroup;
  private timeSlot: TimeSlotView;
  private userList: User[];

  public filteredUsers: Observable<User[]>;

  constructor(
    private dialogRef: MatDialogRef<AssignReservationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      super();
    }

  ngOnInit() {
    super.ngOnInit();

    this.userList = this.data.userList;
    this.timeSlot = this.event as TimeSlotView;

    this.assignReservationForm = this.fb.group({
      user: ['', [Validators.required, this.isInUserList.bind(this)]]
    });

    // setup filter list
    this.filteredUsers = this.assignReservationForm.get('user').valueChanges
      .pipe(
        startWith(''),
        map((value: string) => this.filterUserOptions(value))
      );
  }

  onSubmit() {
    const reservation = new Reservation(undefined,
      this.assignReservationForm.get('user').value,
      this.timeSlot.id,
      false);

    this.dialogRef.close(reservation);
  }

  private filterUserOptions(value: string) {
    const filterValue = value.toLowerCase();

    return this.userList.filter((user: User) => {
      return (user.email.toLowerCase().includes(filterValue) ||
        user.fname.toLowerCase().includes(filterValue) ||
        user.lname.toLowerCase().includes(filterValue));
    });
  }

  private isInUserList(control: FormControl) {
    const foundIndex = this.userList.findIndex((user: User) => {
      return control.value === user.id;
    });

    return (foundIndex !== -1) ? null : { validUser: true };
  }
}
