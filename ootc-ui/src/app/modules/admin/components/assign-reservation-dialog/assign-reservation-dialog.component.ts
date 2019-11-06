import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Reservation } from 'src/app/models/Reservation';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-assign-reservation-dialog',
  templateUrl: './assign-reservation-dialog.component.html',
  styleUrls: ['./assign-reservation-dialog.component.scss']
})
export class AssignReservationDialogComponent implements OnInit {
  public assignReservationForm: FormGroup;
  private timeSlotId: number;
  private userList: User[];

  public filteredUsers: Observable<User[]>;

  constructor(
    private dialogRef: MatDialogRef<AssignReservationDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.userList = this.data.userList;
    this.timeSlotId = this.data.timeSlotId;

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
      this.timeSlotId,
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
    if (this.userList.findIndex((user: User) => (control.value === user.id)) !== -1) {
      return { validUser: true };
    }
    return null;
  }
}
