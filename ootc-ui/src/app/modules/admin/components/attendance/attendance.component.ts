import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDatepicker } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('picker', { static: true }) datePicker: MatDatepicker<Date>;

  public date: moment.Moment;
  public attendanceForm: FormGroup;
  public userFound: boolean = false;
  public id: any;
  public checkInError: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService) { }

  ngOnInit() {
    this.attendanceForm = this.fb.group({
      email: ['', [
        Validators.pattern('[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}'),
      ]]
    });

    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const urlDate = params.get('date');
      this.date = urlDate ? moment(urlDate, 'YYYY-MM-DD').local() : moment();
    });
    this.datePicker._selectedChanged.subscribe((date: Date) => {
      const datePickerDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      this.router.navigate(['/', 'admin', 'attendance'], { queryParams: { date: datePickerDate } });
    });
  }

  userCheckIn() {
    // date formatting: yyyy-mm-dd
    // date is automatically handled on the server if we are not overriding
    const email = this.attendanceForm.get('email').value.toString().toLowerCase();
    const dateString = this.date.format('YYYY-MM-DD');
    this.reservationService.reservationSignin(email, dateString)
      .subscribe((res: boolean) => {
        this.checkInError = false;
        if (res) {
          this.userFound = true;
          setTimeout(() => {
            this.attendanceForm.reset();
            this.userFound = false;
          }, 5000);
        }
        else {
          this.checkInError = true;
        }
      });
  }

  clearForm() {
    this.attendanceForm.reset();
    this.userFound = false;
    this.checkInError = false;
  }

  goNext() {
    this.router.navigate(['/', 'admin', 'attendance'], { queryParams: { date: this.date.add(1, 'day').format('YYYY-MM-DD') } });
  }

  goPrevious() {
    this.router.navigate(['/', 'admin', 'attendance'], { queryParams: { date: this.date.subtract(1, 'day').format('YYYY-MM-DD') } });
  }
}
